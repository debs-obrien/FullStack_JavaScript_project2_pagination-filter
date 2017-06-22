/**
 * Created by debbieobrien on 21/06/2017.
 */
const $studentList = $('.student-list');
const list = $('.student-item');
const studentAmount = list.length; //total amount of students
const numberToShow = 10; //changing this number will modify the amount to show for all functions
const pageCalc = Math.ceil(studentAmount/numberToShow);//calculate the amount of pages needed brought upwards so 5.4 becomes 6
let activePage = 1; //page you are on. starts at 1 changes with pagination

      console.log('num students ' + studentAmount)//shows the number of students
      console.log('pages ' + pageCalc); //shows the amount of pages

//calculate the amount of pages needed
const showPage = () => {
  let pageStart = activePage * numberToShow - numberToShow; //start with 1 if on page 1
        console.log('page start ' + pageStart);
  let pageEnd = pageStart + numberToShow -1; //keeps it dynamic
        console.log('page end ' + pageEnd);
  //hide all
    for(let i = 0; i < studentAmount; i++){
      list[i].style.display='none';
    }
    //find and display amount of students depending on page start and page end
    //if page is not a full page then we need to recalcualte the end of the page
    if(pageEnd > studentAmount){
      pageEnd = studentAmount -1;
    }
    for(let i = pageStart; i <= pageEnd; i++){
      list[i].style.display='block';
        console.log('student ' + i);
    }
}

const appendPageLinks = list => {
//create the pagination
  let paginationHTML = '<div class="pagination">';
  paginationHTML += '<ul>';
  for(i = 1; i <= pageCalc; i++){
      paginationHTML += '<li>';
      paginationHTML += '<a href="#">';
      paginationHTML += i;
      paginationHTML += '</a>';
      paginationHTML += '</li>';
    }
  paginationHTML += '</ul>';
  paginationHTML += '</div>';
//add pagination to the end of the list
  $('.student-list').append(paginationHTML);

//call function to show page
  showPage();

//add active class to page 1
  $('.pagination li a:first').addClass('active');

//calculate what page depending on what number is clicked and recall function
const paginationLink = $('.pagination li a');
  paginationLink.click(function(){
       activePage = paginationLink.index(this)+1; //need to add 1 as index starts at 0
       paginationLink.removeClass(); //remove all prior classes
       $(this).addClass('active'); //add active class to one clicked
       console.log('the page number is ' + activePage);
       showPage();
    })
}
//call function to add links
appendPageLinks(list);
