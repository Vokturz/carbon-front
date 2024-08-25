<script>
import { page } from '$app/stores';
import logo from '$lib/images/svelte-logo.svg';
import github from '$lib/images/github.svg';
</script>

<header>
	<!-- <div class="corner">
		<a href="https://github.com/your-repo" target="_blank" class="github-link">
            <img src={github} alt="GitHub" class="github-logo">
        </a>
	</div> -->

	<div class="header-container">
		<h1 class="header">CARBONADA</h1>
	  </div>
</header>


<style>
.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  height: 100px; /* Adjust the height as needed */
}

.header {
  margin: 0;
  padding: 10px;
  font-size: 40px;
  z-index: 1000;
  color: chocolate;
  text-shadow: 
    -2px -2px 0 #000,  
     2px -2px 0 #000,
    -2px  2px 0 #000,
     2px  2px 0 #000, /* Black border */
    -4px -4px 0 #fff,  
     4px -4px 0 #fff,
    -4px  4px 0 #fff,
     4px  4px 0 #fff; /* White border */
}

/* .corner {
		width: 3em;
		height: 3em;
		z-index: 2000;
		background-color: white;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	} */
</style>
