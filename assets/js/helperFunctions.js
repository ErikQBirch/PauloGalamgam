export const helperFunctions = {
  addHoverTitle: function(element,titleText=""){
    element.setAttribute("title",titleText);
    return element;
  },
  appendChildren: function (parent, ...elementChildren) {
    for (let i in elementChildren) {
      parent.appendChild(elementChildren[i]);
    }
    return parent;
  },
  camelize: function(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  },
  customSpecialElements: function (element, ...extraAttributes) { //CLONE?
    switch (element.classList.value) {
      case 'video':
        element.setAttribute('autoplay', 'autoplay');
        element.setAttribute('loop', true);
        element.muted = 'muted';
        break;
      case 'lazyLoad':
        element.setAttribute('src',"../assets/resources/imgs/placeholder.jpg");
        element.setAttribute('data-src', extraAttributes[0]);
        element.setAttribute('alt',extraAttributes[1]);
        break;
      case 'email':
        console.log(element);
        element.setAttribute('href',"#/");
        navigator.clipboard.writeText(extraAttributes[0]);
        element.addEventListener('click',()=>{
          alert("Copied the text: " + extraAttributes[0]);
        })
        break;
      default:
        break;
    }
    return element;
  },
  findParent: function( //NEEDS IMPROVEMENT
    targetParent,
    potentialChild,
    parent = potentialChild.parentElement,
    stop=false){

      console.log(targetParent);
      while(stop == false){{
        if(parent == targetParent){
        stop = true;
      }
      else if (parent.tagName == "HTML"){
        stop = true;
      }
      else {
        parent = parent.parentElement;
      } 
        }
      }

      console.log(parent, targetParent);
      return parent;
  },
  generateElement: function (
    paramElement,
    paramId = '',
    paramClass = '',
    paramText = '',
    paramLink = ''
  ) {
    let element = document.createElement(paramElement);
    element.id = paramId;
    element.setAttribute('class', paramClass);

    if (paramText != '') {
      element.innerHTML = paramText;
    }

    switch (paramElement) {
      case 'img':
        element.setAttribute('src', paramLink);
        element.setAttribute('alt', paramText);
        element.innerHTML = '';
        break;
      case 'a':
        element.setAttribute('href', paramLink);
        break;
      case 'button':
      case 'btn':
        if (paramClass.includes('clipboard') && paramLink){
          navigator.clipboard.writeText(paramLink);
          console.log(paramLink);
        }
        else if (paramLink){
          element.addEventListener('click',()=>{
            console.log(window.location.href);
            window.location.replace(paramLink);
          })
        }
        break;
      case 'input':
        element.setAttribute('type', paramClass);
        element.setAttribute('name', paramId);
        break;
      case 'source':
        element.setAttribute('src', paramLink);
        element.setAttribute('type', paramClass);
        break;
      case 'meta':
        element.id = "";
        element.setAttribute('name', paramId);
        element.setAttribute('content',paramText);
        break;
      default:
        break;
    }

    return element;
  },
  getCurrentPage: function(
    pageList,
    url = window.location.href
  ){
    let option = "index";
    pageList.forEach(opt => {
      if (url.includes(opt)){
        option = opt;
        return option;
      }
    });
    return option;
  },
  getPathAdjuster: function(
    pageList,
    url = window.location.href,
    isIndex = true,
    pathAdjuster = ["","pages/"]
  ){
    pageList.forEach(page => {
      if (url.includes(page)){
        isIndex = false;
      }
    });

    if (isIndex == false){
      pathAdjuster = ["../",""];
    }
    // console.log(pathAdjuster);
  return pathAdjuster;
  },
  getSingleUrlParam: function(  //Beta
    //urlParams.get(''), urlParams.has(''), urlParams.getAll(''),
    param, 
    queryString = window.location.search,
    urlParams = new URLSearchParams(queryString),
    singleParam = urlParams.get(param)
  ){
    return singleParam;
  },
  metaInfo: function(
    content = {
      "keywordList": "",
      "description":""
    },
    head = document.querySelector('head'),
    keywords = this.generateElement('meta',"keywords","",content.keywordList),
    description = this.generateElement('meta',"description","",content.description),
    author = this.generateElement('meta',"author","","Erik Q. Birch"),
  ){
    head = helperFunctions.appendChildren(head, keywords,description,author)
  },
  nestChildren: function(parent, ...elementChildren){
    // console.log(elementChildren)
    parent.appendChild(elementChildren[0]);
    for (let i=1; i<elementChildren.length; i++){
        elementChildren[i-1].appendChild(elementChildren[i]);
    }
    return parent;
  },
  removeBRelement: function (text){
    while (text.indexOf("<br>") != -1){
      text = text.replace("<br>"," ");
    }
    return text;
  },
  toTitleCase: function(str) {
    return str.replace(
      "/\w\S*/g",
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
}