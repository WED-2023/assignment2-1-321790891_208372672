"use strict";(self["webpackChunkassignment_2_1"]=self["webpackChunkassignment_2_1"]||[]).push([[251],{6251:(e,t,i)=>{i.r(t),i.d(t,{default:()=>d});var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"private-page"},[t("div",{staticClass:"recipes-container"},[t("div",{staticClass:"content"},[t("RecipePreviewList",{ref:"recipeList",staticClass:"RandomRecipes",attrs:{title:"MY RECIPES",titleStyle:e.customTitleStyle,recipes:e.userRecipes,PrivateRecipe:!0},nativeOn:{click:function(t){return e.goToRecipe(e.recipe.id)}}})],1)])])},r=[],n=i(124),c=i(8534),a=(i(7658),i(4857)),o=i(3099);const p={components:{RecipePreviewList:a.Z},data:function(){return{customTitleStyle:{fontSize:"40px",marginBottom:"20px"},userRecipes:[]}},mounted:function(){var e=this;return(0,c.Z)((0,n.Z)().mark((function t(){var i;return(0,n.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,o.V4)();case 3:i=t.sent,e.userRecipes=i,t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.error("Failed to load user recipes:",t.t0.message);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},methods:{goToRecipe:function(e){console.log("Navigating to private recipe with ID:",e),this.$router.push({name:"PrivateRecipeFullView",params:{recipeId:e}})}}},u=p;var l=i(1001),v=(0,l.Z)(u,s,r,!1,null,"f6d6ea60",null);const d=v.exports}}]);
//# sourceMappingURL=251.2b8817e0.js.map