export const initDates = () => {
	console.log('hello world');
};

export const boxRoom = () => {
	const currentRoom = document.getElementById('rooms');
	const controlPax = document.getElementById('box-room-pax');

	const h = buildHTML(1);
	controlPax.innerHTML = h;

	currentRoom.addEventListener('change', () => {
    let html = '';
    console.log('click on', currentRoom.value);

		switch (currentRoom.value) {
			case 2:
        html = buildHTML(2);
        console.log(html);
				controlPax.innerHTML = html;
				break;
			case 3:
        html = buildHTML(3);
        console.log(html);
				controlPax.innerHTML = html;
				break;
			case 1:
			default:
        html = buildHTML(1);
        console.log(html);
        controlPax.innerHTML = html;
				break;
		}
	});
};

const buildHTML = (index) => {
  let build = '';
	for (let i = 1; i < index; i++) {
    build+= getAddPeople(i);
  }
	return build;
};

const getAddPeople = (index) => {
	return `<div class="box-room__pax-item">
  <div>
    <div class="form__group">
      <label class="form__label" for="adults-${index}">
        Adultos
      </label>
      <select class="form__select" name="adults-${index}" id="adults-${index}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
  </div>
  <div>
    <div class="form__group">
      <label class="form__label" for="children-${index}">
        Niños
      </label>
      <select class="form__select" name="children-${index}" id="children-${index}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
  </div>
</div>`;
};

