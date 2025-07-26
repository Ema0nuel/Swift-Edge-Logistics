import ErrorView from "/src/images/errorPage/page_not_found.svg";

const notfound = () => ({
    html: /* html */`
    <div class="flex flex-col items-center justify-center min-h-screen px-4 bg-background-light text-text-dark dark:bg-background-dark dark:text-text-light transition-colors duration-300">
      <img class="max-w-full mb-8 h-auto object-contain" alt="Page Not Found" src="${ErrorView}" />
      <h1 class="text-center mt-0 mb-2 text-2xl leading-8 font-bold text-primary dark:text-accent">This Page Does Not Exist</h1>
      <p class="text-center max-w-xl mb-6 text-base leading-6 font-normal text-text-subtle dark:text-peach-soft">
        Sorry, the page you are looking for could not be found. It's just an accident that was not intentional.
      </p>
      <a href="/" data-nav class="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition dark:border-accent-dark dark:text-accent-dark dark:hover:bg-accent-dark dark:hover:text-white">
        <i class="fas fa-arrow-left"></i>
        <span>Back to Home</span>
      </a>
    </div>
  `,
});

export default notfound;
