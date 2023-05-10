const main = document.querySelector('main');
const imdbID = window.location.search.match(/id=(.*)/)[1];

function getBlog(imdbID) {
  return fetch(`/blog/${imdbID}`)
    .then(res => res.json());
}

function showBlog(blog) {
  // console.log(blog);
  const section = document.createElement('section');
  main.appendChild(section);

  const properties = ['AutherName','Title','PublishedDate','ReadingTime','ResponseCount'];

  var descriptionHTML = properties.reduce((html, property) => {
    html += `
    <dt class="col-sm-3">${property}</dt>
    <dd class="col-sm-9">${blog[property]}</dd>`;
    return html;
  }, '');
  
  var HTMLTag =`<dt class="col-sm-3">Tags</dt>\n`;
  var aTag=``;
  if(blog.tags){
    blog.tags.forEach(element => {
      aTag+=`<a href=/tag.html?tag=${element}>${element}</a>`;
    });
  }
  HTMLTag+=`<dd class="col-sm-9">${aTag}</dd>`;
  // console.log(HTMLTag)
  section.outerHTML = `
    <section class="row">
      ${blog.ContentHTML}
      <div class="col-sm-12">
        <dl class="row">
          ${descriptionHTML}
          <dt class="col-sm-3">ReferenceLink</dt>
          <dd class="col-sm-9"><a href=${blog.ReferenceLink}>click here</a></dd>
          ${HTMLTag}
        </dl>
      </div>
    </section>
  `;
}

getBlog(imdbID)
  .then(showBlog);
