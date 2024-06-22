<template>
  <div class="about-page">
    <div class="container">
      <h1 class="title">ABOUT <span class="special-font">FOXCHEF CUISINE</span></h1>
      <div class="content">
        <p>
          Welcome to <strong class="special-font">FOXCHEF CUISINE</strong> ! We are a dedicated team of students passionate about bringing the joy of cooking to everyone. Our mission is to create a user-friendly platform where food enthusiasts can explore a diverse range of recipes, from traditional favorites to innovative culinary creations.
        </p>
        <p>
          Our website features a vast collection of recipes that cater to various dietary preferences and cuisines. Whether you're looking for vegetarian, vegan, gluten-free, or family-friendly recipes, FOXCHEF CUISINE has something for everyone. Each recipe is carefully curated to ensure that you have the best cooking experience.
        </p>
        <p>
          As students, we have combined our skills in web development and culinary arts to create a platform that is both visually appealing and highly functional. We believe that cooking should be an enjoyable and accessible activity for everyone, and we are committed to continuously improving our website based on user feedback.
        </p>
        <h2 class="subtitle">Our Team</h2>
        <p>
          Our development team consists of aspiring web developers and designers who are passionate about food and technology. We have worked tirelessly to bring FOXCHEF CUISINE to life, and we are excited to share our project with you.
        </p>
        <!-- <h2 class="subtitle">Explore More</h2>
        <ul class="links">
          <li><router-link to="/exercise1">Exercise 1</router-link></li>
          <li><router-link to="/exercise2">Exercise 2</router-link></li>
          <li><router-link to="/exercise3">Exercise 3</router-link></li>
        </ul> -->
      </div>
    </div>
  </div>
</template>



<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-page {
  background-image: url('~@/assets/about-background.jpg'); /* Adjust the path based on your actual image location */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
}

.special-font {
  font-family: 'Lucida Handwriting', cursive; /* Different font for the site name */
}

.content {
  font-size: 18px;
  line-height: 1.8;
}

.subtitle {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.links {
  list-style: none;
  padding: 0;
}

.links li {
  margin-bottom: 10px;
}

.links a {
  color: #e97f29;
  text-decoration: none;
  font-weight: bold;
}

.links a:hover {
  text-decoration: underline;
}
</style>
