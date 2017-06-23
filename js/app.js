/**
 * Created by debbieobrien on 21/06/2017.
 */
 const numberToShow = 10; //changing this number will modify the amount to show for all functions

let $studentList = [];
$('.student-item').each(function(){
  $studentList.push($(this));
});
let studentAmount = $studentList.length;  //total amount of students
let pageCalc = Math.ceil(studentAmount/numberToShow);//calculate the amount of pages needed brought upwards so 5.4 becomes 6
let activePage = 1; //page you are on. starts at 1 changes with pagination

//function to hide all student List or Filtered list
const hideAll = (myList) => {
  myList.forEach(function (element){
    $(element).hide();
  })
}


/**
Function to calculate the amount of pages needed
*/
const showPage = (myList) => {
    let pageStart = (activePage -1) * numberToShow; //start with student[0] if on page 1
    let pageEnd = pageStart + numberToShow -1; //keeps it dynamic eg 0+10-1=9 student[9]
  //hide all
    hideAll(myList);

    //find and display amount of students depending on page start and page end
    //if page is not a full page then we need to recalcualte the end of the page
    if(pageEnd > studentAmount -1){
      pageEnd = studentAmount -1;
    }
    for(let i = pageStart; i <= pageEnd; i++){
      myList[i].show();
    }
}
/**
Function to create Pagination
*/
const createPagination = () => {
  $('.student-list').append('<div class="pagination"></div>');
  $('.pagination').append('<ul></ul>');
    for(i = 1; i <= pageCalc; i++){
        $('.pagination ul').append('<li><a href="#">' + i + '</a></li>');
      }
  }
/**
Function to append pagination Links to page
*/
const appendPageLinks = (listToAppend) => {

  createPagination();//call function to create Pagination

  $('.pagination li a:first').addClass('active'); //add active class to page 1

/**
Function to calculate what page depending on what number is clicked and recall function
*/
const $paginationLink = $('.pagination li a');
  $paginationLink.click(function(){
       activePage = $paginationLink.index(this)+1; //need to add 1 as index starts at 0

       $paginationLink.removeClass('active');
       $(this).addClass('active'); //add active class to one clicked
       showPage(listToAppend);
    })
}

/**
Function to create Filter and append to page
*/
const createFilter = () => {
  $('.page-header H2').after('<div class="student-search"></div>');
  $('.student-search').append('<input placeholder="Search for students...">');
  $('.student-search').append('<button>Search</button>');
}

/**
Function to Filter for Names searched for
*/
const filterNames = (myList) => {
  createFilter();  //constructs the filter input and button

  $('.student-search  button').click(function(){

    let value = $('input').val();  //get value of input
    hideAll(myList); //hide list
    $('.pagination').remove();  //remove pagination

     //create empty array to store email value
    filteredList = [];
    //$filteredList = $.makeArray($filteredList);

    myList.forEach(function(element){
      let name = $(element).find('.student-details').children('h3').text();
      let email = $(element).find('.student-details').children('.email').text();
      let nameEmail = name + ' ' + email

      if (nameEmail.indexOf(value) > -1) {
          filteredList.push($(element));
      }
    });
    //recalcualte values
    activePage = 1;
    studentAmount = filteredList.length;
    pageCalc = Math.ceil(studentAmount / numberToShow);

    showPage(filteredList);//call function to show page
    appendPageLinks(filteredList);

  });

}
//call function to add links and filter
showPage($studentList);//call function to show page
appendPageLinks($studentList);
filterNames($studentList);
