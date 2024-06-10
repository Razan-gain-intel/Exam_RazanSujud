$(document).ready(function () {
    function addItemToList(listId, itemText, itemClass) {
        let item = $(`<li class="list-group-item ${itemClass} hide">${itemText}</li>`);
        $(listId).append(item);
        setTimeout(function () {
            item.removeClass('hide');
        }, 10);
    }

    function addItem() {
        let item = $('#addItemInput').val().trim();
        if (item === '') {
            alert('Please enter an item.');
            return;
        }

        let itemType = $('input[name="itemType"]:checked').val();
        let prefixedItem = `${itemType.charAt(0).toUpperCase() + itemType.slice(1)}! - ${item}`;
        let itemClass = itemType === 'fruits' ? 'bg-info text-primary' : 'bg-warning text-white';

        if (this.id === 'addSpecificItemBtn') {
            if (itemType === 'fruits') {
                addItemToList('#fruitsList', prefixedItem, itemClass);
            } else {
                addItemToList('#legumesList', prefixedItem, itemClass);
            }
        } else {
            addItemToList('#generalList', prefixedItem, 'bg-info text-primary');
        }

        $('#addItemInput').val('');
    }

    function deleteItem() {
        let item = $('#searchInput').val().trim().toLowerCase();
        if (item === '') {
            alert('Please enter an item to delete.');
            return;
        }

        $('#fruitsList li, #legumesList li, #generalList li').each(function () {
            console.log(this)
            let listItem = $(this);
            let itemText = $(listItem).text().toLowerCase();
            if (itemText.includes(item)) {
                listItem.addClass('hide');

                setTimeout(function () {
                    listItem.removeClass('hide');
                    listItem.remove()
                }, 300);
            }

        });

        $('#searchInput').val('');
    }

    function searchItem() {
        let searchValue = $('#searchInput').val().trim().toLowerCase();
        $('#fruitsList li, #legumesList li, #generalList li').each(function () {
            let itemText = $(this).text().toLowerCase();
            if (searchValue === '') {
                $(this).removeClass('bg-danger text-white');
            } else if (itemText.includes(searchValue)) {
                $(this).addClass('bg-danger text-white');
            } else {
                $(this).removeClass('bg-danger text-white');
            }
        });
    }


    function moveItem() {
        let itemText = $(this).text();
        if (itemText.includes('Fruits!')) {
            addItemToList('#fruitsList', itemText, 'bg-info text-primary');
        } else if (itemText.includes('Legumes!')) {
            addItemToList('#legumesList', itemText, 'bg-warning text-white');
        }
        $(this).remove();
    }

    $('#addSpecificItemBtn').click(addItem);
    $('#addGeneralItemBtn').click(addItem);
    $('#deleteItemBtn').click(deleteItem);
    $('#searchItemBtn').on('click', searchItem);
    $('#generalList').on('click', 'li', moveItem);
});
