/* Start of Project statement*/
/*
For the development of this project, in order to ensure consistency i used Microsoft Copilot AI for code standards and for integration testing. My human made work was the troubleshooting and implementation fo the google teachable machine Javascript file. 
    no statements or summaries was AI generated for this project, as those were made by me as well.

*/
/* End of project statement --FA--*/



/* Below is code that I implemented to help provide some interactivity to our teachable machine page, primarily with our project so that it wasn't just a super long block of text taking up the entire page, but something that people can read through in a more leisure and interactive way 
I utilized a YouTube tutorial for this page that I also linked on the YouTube page: https://www.youtube.com/watch?v=XH5OW46yO8I
I also had previous experience creating modals using javascript with an intro to web development course, so having that prior knowledge was also helpful here!
I used ChatGPT to help me troubleshoot clicking out of the modal, as I also mentioned on the html page with my comment. -- AP --  */ 


function modalInteraction (open, modal, close){
    const openModal = document.getElementById(open); 
    const modalContainer = document.getElementById(modal);
    const closeModal = document.getElementById(close);

    openModal.addEventListener('click', () => {
        modalContainer.classList.add("show");
}); 

    closeModal.addEventListener('click', () => {
        modalContainer.classList.remove("show");
    });  

    modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
            modalContainer.classList.remove("show");
        }
    });

 }

modalInteraction("open_data_collection", "data_collection_modal_container", "close_data_collection");
modalInteraction("open_classification", "classification_modal_container", "close_classification");
modalInteraction("open_algorithmic_bias", "algorithmic_bias_modal_container", "close_algorithmic_bias");
modalInteraction("open_power_consequences", "power_consequences_modal_container", "close_power_consequences");
modalInteraction("open_data_collection", "data_collection_modal_container", "close_data_collection_top");
modalInteraction("open_classification", "classification_modal_container", "close_classification_top");
modalInteraction("open_algorithmic_bias", "algorithmic_bias_modal_container", "close_algorithmic_bias_top");
modalInteraction("open_power_consequences", "power_consequences_modal_container", "close_power_consequences_top");