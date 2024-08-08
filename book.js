document.addEventListener("DOMContentLoaded", function(){
    const daysInWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentMonthYear = document.querySelector('#current-month-year');
    const calendarDay = document.querySelector('#calendar-day');
    const calendarDate = document.querySelector('#calendar-date');
    const todayDate = new Date();
    const timeSelection = document.querySelector('#time');
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let firstDayOfTheMonth = new Date(currentYear, currentMonth, 1);
    let lastDayOfTheMonth = new Date(currentYear, currentMonth + 1, 0);

    // Append day headers
    daysInWeek.forEach((d) => {
        calendarDay.innerHTML += `<th>${d}</th>`;
    });

    loadDates();

    function loadDates() {
        //month year in the nav
        currentMonthYear.innerHTML = `${months[currentMonth]} ${currentYear}`;


        let dayOfWeek = firstDayOfTheMonth.getDay(); // Sunday is 0
        dayOfWeek = (dayOfWeek === 0) ? 6 : dayOfWeek - 1; // Adjust so Monday is 0

        let rowHTML = "<tr>";
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < dayOfWeek; i++) {
            rowHTML += "<td></td>";
        }

        for (let i = 1; i <= lastDayOfTheMonth.getDate(); i++) {
            if(i === todayDate.getDate() && currentMonth == todayDate.getMonth() && currentYear === todayDate.getFullYear()){
                rowHTML += `<td class="today-date">${i}</td>`;

            }else{
                rowHTML += `<td>${i}</td>`;

            }
            dayOfWeek++;

            if (dayOfWeek % 7 === 0 && i !== lastDayOfTheMonth.getDate()) {
                rowHTML += "</tr><tr>";
            }
        }

        // Close the last row
        rowHTML += "</tr>";
        calendarDate.innerHTML = rowHTML;

        //click event for date
        document.querySelectorAll('td').forEach((el, i)=>{
            el.addEventListener('click' ,function(e){
                    let actualMonth = (currentMonth + 1).toString().padStart(2 ,'0');
                    document.querySelector('#date').value = `${e.target.innerHTML.padStart(2 ,'0')}/${actualMonth}/${currentYear}` ;
                    const changeEvent = new Event("change");
                    document.querySelector('#date').dispatchEvent(changeEvent);
            })
            if(el.innerHTML === todayDate.getDate().toString() && currentMonth === todayDate.getMonth() && currentYear === todayDate.getFullYear()){
                //invoke click event
                el.click();
            }
        });

        //select the today
    }

    document.querySelector('#date').addEventListener('change' , function(){
        let date = new Date(currentYear , currentMonth , this.value.slice(0,2));
        //if the date is in weekdays
        if(date.getDay() >= 1 && date.getDay() <= 5){
            //show the time
            timeSelection.removeAttribute('hidden' );
        }else{
            timeSelection.setAttribute('hidden' , '');
        }
    });

    //nav right
    document.querySelector('#nav-right').addEventListener('click',function(){
        if(currentMonth === 11){
            //increase year
            currentYear = currentYear + 1;
            currentMonth = 0;
        }else{
            currentMonth ++;
        }
        firstDayOfTheMonth = new Date(currentYear, currentMonth, 1);
        let nextMonth =  currentMonth + 1;
        lastDayOfTheMonth = new Date(currentYear, nextMonth, 0);

        loadDates();
    });

    //nav left
    document.querySelector('#nav-left').addEventListener('click',function(){
        if(currentMonth === 0){
            //decreaseYear
            currentYear = currentYear - 1;
            currentMonth = 11;
        }else{
            currentMonth --;
        }

        firstDayOfTheMonth = new Date(currentYear, currentMonth, 1);
        let nextMonth =  currentMonth + 1;
        lastDayOfTheMonth = new Date(currentYear, nextMonth, 0);

        loadDates();
    });

});