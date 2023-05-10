// get blogs based on tags

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cheerio=require('cheerio');
const { response } = require('express');
const Blog = require('./schema.js');
const Historytags = require('./schemaHistory.js');

const searchUrl = "https://medium.com/tag/";
var blogs={};
const searchTag = async (tag)=>{
    blogs={};
    
    const historyTag={tag};
    var task=await Historytags.findOne({tag:historyTag.tag});
    if(!task){
        await Historytags.create(historyTag);
    }

    return new Promise(async(resolve,reject)=>{
        var task=await Blog.find({Tag:tag});
        if(task.length!=0){
            resolve(task);
            return;
        }
        fetch(`${searchUrl}${tag}`)
        .then(async (response)=>{
            const body = await getBody(response);
            const $=cheerio.load(body);
            const items=[];
            const artile = $('article');
            var count=0;
            if(artile.length==0){
                resolve(null);
            }
            artile.each((i,element)=>{
                getInformation(element,$,tag).then(async(res)=>{
                    const blog=await addToMongo(res);
                    res['id']=blog._id.toString();
                    items.push(res);
                    count++;
                    if(count==artile.length){
                        resolve(items);
                    }
                    done=true;
                })
            });
        })
    })
}

const getBody=(response)=>{
    return new Promise((resolve,reject)=>{
        if(response.ok==false){
            resolve(null);
        }
        resolve(response.text());
    });
}

const addToMongo=async (res)=>{
    var task=await Blog.findOne({BlogLink:res.BlogLink});
    if(!task){// adds to the database only if there is no blog with same BlogLink
        task=await Blog.create(res);
        return task;
    }
    return task;
}
const getInformation=(element,$,tag)=>{
    return new Promise((resolve,reject)=>{
        const $element=$(element);
        const BlogTitle = $element.find(`.ab>div>div>a>div>h2`).text();
        var BlogLink = $element.find(`.ab>div>div.l>a`).attr('href');
        BlogLink = BlogLink.split('?')[0];
        const ImageLink = $element.find(`.ab>div>a>div>img`).attr(`src`);

        var items={
            BlogTitle:BlogTitle,
            BlogLink:BlogLink,
            ImageLink:ImageLink,
            Tag:tag
        }
        resolve(items);
    })
}
module.exports={
    searchTag,
}