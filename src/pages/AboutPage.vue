<template>
  <div class="about-page">
    <div class="container">
      <h2 class="container-title">
        ABOUT <span class="special-font">FOXCHEF CUISINE</span>
      </h2>
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
        <br>
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
  padding: 30px;
}

.container {
  background: rgba(255, 255, 255, 0.9); 
  padding: 80px;
  display: flex;
  justify-content: center; ;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  max-width: 900px; 
  width: 100%; 
  min-height: 100vh;
  box-sizing: border-box;
  position: relative; 
}

.container::before {
  content: '';
  position: absolute;
  top: 20px; /* Adjust this value to control distance from the top */
  left: 20px; /* Adjust this value to control distance from the left */
  right: 20px; /* Adjust this value to control distance from the right */
  bottom: 20px; /* Adjust this value to control distance from the bottom */
  border: 4px solid #f3c562; /* Orange border */
  pointer-events: none; /* Ensures it does not interfere with content */
  z-index: 0; /* Keeps it behind the title */

  /* Clip out the portion behind the title */
  clip-path: polygon(0 0, 23% 0, 23% 45px, 77% 45px, 77% 0, 100% 0, 100% 100%, 0 100%);
}

.container-title{
  font-size: 26px;
  color: #e97f29; /* Orange color for the title */
  position: absolute; /* Absolute positioning to move it in line with the top border */
  top: 10px; /* Adjust this value to move the title higher, closer to the top */
  left: 50%; /* Center the title horizontally */
  transform: translateX(-50%); /* Adjusts centering considering absolute position */
  padding: 0 20px; /* Adds padding to the background around the text */
  z-index: 10; /* Ensure the title is layered above the border */
  font-weight: bold;
  letter-spacing: 3px; /* Add spacing between letters */
  white-space: nowrap; /* Prevents the title from breaking into multiple lines */
}


.special-font {
  font-family: 'Lucida Handwriting', cursive; /* Different font for the site name */
}

.content {
  font-size: 18px;
  line-height: 2;
  padding: 20px;
}

.subtitle {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
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
