// gets the selected blogs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cheerio=require('cheerio');
const { response } = require('express');

const events=require('events');
const eventEmitter=new events.EventEmitter;

const html=require('html');


const Blog = require('./schema.js');
const BlogDetails=require('./schemaBlog.js');
const searchUrl = "https://medium.com";


const getBlog  = async(id)=>{
    const blog=await getBlogLinkWithIdFromMongo(id);
    const link=blog.BlogLink;
    var task=await BlogDetails.findOne({ReferenceLink:blog.BlogLink});
    if(task){
        return new Promise((resolve,reject)=>{
            resolve(task);
        })
    }
    return new Promise((resolve,reject)=>{
        const ReferenceLink=`${searchUrl}${link}`;
        fetch(ReferenceLink)
        .then(response=>response.text())
        .then(async body=>{
            const $=cheerio.load(body);
            const AutherName = $(`div.ab.q>div.ab.q>p>a`).text();
            const Title = blog.BlogTitle;
            const PublishedDate = $(`.pw-published-date`).text();
            const ReadingTime = $(`.pw-reading-time`).text();
            var tags;
            await getRelatedTags($).then(res=>{
                tags=res;
            });
            var ContentHTML =  $(`section`).html();
            ContentHTML =html.prettyPrint(ContentHTML);
            var ResponseCount=$(`.pw-responses-count`).text();
            if(!ResponseCount){
                ResponseCount=0;
            }
            const values={
                AutherName:AutherName,
                Title:Title,
                PublishedDate:PublishedDate,
                ReadingTime:ReadingTime,
                ResponseCount:ResponseCount,
                tags:tags,
                ReferenceLink:ReferenceLink,
                ContentHTML:ContentHTML
            }
            // console.log(values);
            await BlogDetails.create(values);
            resolve(values);
        })
    })
}
const getBlogLinkWithIdFromMongo=async (id)=>{
    const blog=await Blog.findOne({_id:id});
    return new Promise((resolve,reject)=>{
        resolve(blog);
    });
}
const getRelatedTags=($)=>{
    return new Promise((resolve,reject)=>{
        const tagSelector=$(`div.abr.ab`);
        const tags=[];
        if(tagSelector.length==0){
            resolve(null);
        }
        tagSelector.each((i,element)=>{
            const $element=$(element);
            const tag = $element.find(`a>div`).text();
            tags.push(tag);
            if(tags.length==tagSelector.length){
                resolve(tags)
            }
        })
    })
}
module.exports={
    getBlog
}