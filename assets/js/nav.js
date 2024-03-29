import { helperFunctions } from "./helperFunctions.js";
import { worksDB } from "../content/db/worksDB.js";

export const navigation = {
  pageList: ["gallery","about","experience","contact"],
  pathAdjuster: [],
  currentPage:"",
  addHomeToNav: function(
    ul_tag,
    li_tag = helperFunctions.generateElement('li'),
    a_tag = helperFunctions.generateElement('a',"","",`<span></span>Home`,`${this.pathAdjuster[0]}`)
  ){
    // console.log(this.currentPage);
    if (this.currentPage != "index"){
      ul_tag = helperFunctions.nestChildren(ul_tag, li_tag,a_tag)
    }
    return ul_tag;
  },
  closePopup: function(
    main = document.querySelector('main'),
    header = document.querySelector('header'),
    footer = document.querySelector('footer'),
    popup = document.querySelector('#popupMolecule'),
    sideMenu = document.querySelector('section#sideMenu')
  ){
    header.classList.remove('clear');
        footer.style.display = "flex";
        popup.remove();
        if (sideMenu.classList.contains('closed')){
          main.classList.remove('blur') 

        }
        console.log("close popup");
  },
  getNavigationPackage: function(){
    this.setGlobalVariables();
    let navPackage = [
      this.logo_element(),
      this.nav_molecule(),
      this.hamburger_atom(),
      this.sideNav_molecule(),
    ]

    return navPackage;
  },
  hamburger_atom:function(
    menuBtn = helperFunctions.generateElement('div',"menu-btn","menu-btn"),
    burger = helperFunctions.generateElement('span',"","burger",`<i class="fa-solid fa-bars"></i>`),
    x = helperFunctions.generateElement('span',"","x",`<i class="fa-solid fa-x"></i>`),
  ){
    x.classList.add('faded')
    menuBtn = helperFunctions.appendChildren(menuBtn, burger, x);
    return menuBtn;
  },
  logo_element: function(
    link = helperFunctions.generateElement('a', "logoArea","","",`${this.pathAdjuster[0]}`),
    figure = helperFunctions.generateElement('figure'),
    logo = helperFunctions.generateElement('img',"","","",`${this.pathAdjuster[0]}assets/content/imgs/PLG_logo.webp`),
    // span = helperFunctions.generateElement('span',"","","PAULO<br>GALAMGAM")
  ){
    link = helperFunctions.nestChildren(link, figure, logo);
    // link.appendChild(span);
    return link;
  },
  nav_molecule: function(
    nav_tag = helperFunctions.generateElement('nav',"mainNav"),
    ul_tag = helperFunctions.generateElement('ul'),
    options = ["Gallery","About","Experience","Contact"]
  ){
    ul_tag = this.addHomeToNav(ul_tag);
    options.forEach(opt => {
      let li_tag = helperFunctions.generateElement('li');
      if (opt == "Gallery"){
        let gallery_btn = helperFunctions.generateElement('button',"","",`<span></span>${opt}`);
        gallery_btn.addEventListener('click',(
          e,
        )=>{
          this.openPopup();
        })
        li_tag.appendChild(gallery_btn);
      }
      // else if (opt = "Paulo Loveranes<br>Galamgam"){
      //   let gallery_btn = helperFunctions.generateElement('button',"blah","",opt);
      //   li_tag.appendChild(gallery_btn);
      // }
      else{
        let a_tag = helperFunctions.generateElement('a',"","",`<span></span>${opt}`,`${this.pathAdjuster[0]}pages/${opt.toLowerCase()}.html`);
        li_tag.appendChild(a_tag);
      }
      ul_tag.appendChild(li_tag);
    });

    nav_tag.appendChild(ul_tag);
    return nav_tag;
  },
  openPopup: function(
    body = document.querySelector('body'),
    main = document.querySelector('main'),
    popup = this.popupMolecule(),
    header = document.querySelector('header'),
    footer = document.querySelector('footer'),
    background = document.querySelector('#background')
  ){
      header.classList.add('clear');
      footer.style.display = "none";
      main.classList.add('blur');

      worksDB.array.forEach(obj => {
        // console.log(obj.seriesName)
        let option = this.optionListMolecule(obj);
        popup.children[1].appendChild(option);
        // console.log(popup.children[1]);w
      });


      body.insertBefore(popup, main);
  },
  optionListMolecule:function(
    obj,
    option = helperFunctions.generateElement('article',"","option"),
    optionLink = helperFunctions.generateElement('a',"","","",`${this.pathAdjuster[0]}pages/gallery.html?id=${obj.id}`),
    figure = helperFunctions.generateElement('figure'),
    img = helperFunctions.generateElement('img',"","","thmbNail",`${this.pathAdjuster[0] + obj.thumbNail}`),
    seriesName = helperFunctions.generateElement('span',"","seriesName",obj.seriesName),
    count = helperFunctions.generateElement('span',"","count",obj.imgs.length)
  ){
    optionLink = helperFunctions.nestChildren(optionLink, figure, img);
    optionLink = helperFunctions.appendChildren(optionLink, seriesName, count);
    option.appendChild(optionLink);
    
    // console.log(this.pathAdjuster)
    return option;
  },
  popupMolecule: function(
    popup = helperFunctions.generateElement('section',"popupMolecule"),
    span = helperFunctions.generateElement('span',"instructions","","Scroll and select gallery option to view."),
    optionHolder = helperFunctions.generateElement('div',"optionHolder"),
    btnHolder = helperFunctions.generateElement('div',"btnHolder"),
    xBtn = helperFunctions.generateElement('button',"xBtn","","Cancel")
  ){
    btnHolder.appendChild(xBtn);
    popup = helperFunctions.appendChildren(popup, span, optionHolder, btnHolder);


   popup .addEventListener('click', (e,
      )=>{
       this.closePopup();
   });
    return popup;
  },
  setGlobalVariables: function(){
    this.currentPage = helperFunctions.getCurrentPage(this.pageList);
    this.pathAdjuster = helperFunctions.getPathAdjuster(this.pageList); 
  },
  sideNav_molecule: function(
    sideNav_tag = helperFunctions.generateElement('section',"sideMenu"),
    nav = this.nav_molecule(),
  ){
    sideNav_tag.appendChild(nav);
    sideNav_tag.classList.add('closed');
    nav.id = "sideNav";
    return sideNav_tag;
  }
  

}

