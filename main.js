document.addEventListener('DOMContentLoaded', function () {

    const btn = document.getElementById('openCloseButton');
    const sidebar = document.querySelector('.sidebar');

    btn.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    })

    const buttons = document.querySelectorAll(".filter-section button");

    buttons.forEach(button =>
        button.addEventListener('click', () => {
            //button.parentElement.querySelectorAll('button').forEach(btn => btn.classList.remove('pressed'));
            //buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.toggle('pressed');
        })
    );

    const clearBtn = document.getElementById('clear');

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            buttons.forEach(button => button.classList.remove('pressed'));
        });
    }

    const popupOverlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('closePopup');

    document.querySelectorAll(".openPopupBtn").forEach(button => {
        button.addEventListener("click", function(){
            popupOverlay.style.display = "flex";

            const bookingOpp = this.closest('.bookingOpp'); 
            if (bookingOpp) {
                const details = bookingOpp.querySelector('.bookingDetails h3').textContent;
                const popupDetails = document.getElementById('bookingInfo p').textContent;

                document.getElementById('popupDetails').textContent = details;
                document.getElementById('popupDetails').textContent = popupDetails;}
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            popupOverlay.style.display = 'none';
        });
    }

    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });

});




