/**
 * Created by debbieobrien on 21/06/2017.
 */
const studentList = document.getElementsByClassName('student-list');

//itterate over the student List
for(let i = 0; i < studentList.length; i += 1){

    studentList[i].style.backgroundColor='#ccc';
}
