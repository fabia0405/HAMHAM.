let droppedImages = []; // 드롭된 이미지들을 저장할 배열
let clickedImageIndex = -1; // 클릭한 이미지의 인덱스

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight); // 웹사이트 크기에 맞게 캔버스 생성
  canvas.id('myCanvas'); // 캔버스에 id 부여
  canvas.drop(handleFileSelect); // 캔버스에 드래그 이벤트 핸들러 등록
  background(255); // 배경을 흰색으로 설정
  
  // '저장' 텍스트 생성
  let saveButton = createP('저장');
  saveButton.position(windowWidth - 60, 10); // 오른쪽 상단에 위치
  saveButton.style('font-size', '10pt'); // 크기 설정
  saveButton.style('color', 'black'); // 색상 설정
  saveButton.style('cursor', 'pointer'); // 마우스 커서 설정
  saveButton.mouseClicked(saveImagesToLocal); // '저장' 텍스트를 클릭했을 때 saveImagesToLocal 함수 호출
  
  // '불러오기' 텍스트 생성
  let loadButton = createP('불러오기');
  loadButton.position(windowWidth - 60, 30); // '저장' 텍스트 바로 아래에 위치
  loadButton.style('font-size', '10pt'); // 크기 설정
  loadButton.style('color', 'black'); // 색상 설정
  loadButton.style('cursor', 'pointer'); // 마우스 커서 설정
  loadButton.mouseClicked(loadImagesFromLocal); // '불러오기' 텍스트를 클릭했을 때 loadImagesFromLocal 함수 호출
  
  // 웹사이트가 로드될 때 저장된 이미지를 로드하여 droppedImages 배열에 추가
  let storedImages = localStorage.getItem('droppedImages');
  if (storedImages) {
    droppedImages = JSON.parse(storedImages);
  }
}

function draw() {
  // 캔버스에 이미지 그리기
  for (let i = 0; i < droppedImages.length; i++) {
    let imgSize = min(width, height) / 20; // 이미지 크기를 캔버스 크기의 1/20으로 설정
    if (i === clickedImageIndex) {
      // 클릭한 이미지는 크기를 15배로 확대하여 중앙에 표시
      let enlargedSize = 15 * imgSize;
      image(droppedImages[i], width / 2 - enlargedSize / 2, height / 2 - enlargedSize / 2, enlargedSize, enlargedSize);
    } else {
      image(droppedImages[i], 0, i * imgSize, imgSize, imgSize); // 이미지를 캔버스에 그리기
    }
  }
}

function handleFileSelect(file) {
  if (file.type.match('image.*')) { // 이미지 파일인지 확인합니다.
    let img = createImg(file.data, ''); // 이미지 파일을 로드합니다.
    droppedImages.push(img); // 배열에 이미지를 추가합니다.
    
    // 추가된 이미지를 로컬 스토리지에 저장합니다.
    localStorage.setItem('droppedImages', JSON.stringify(droppedImages));
  } else {
    alert('이미지 파일을 업로드해주세요.'); // 이미지 파일이 아닌 경우 경고를 표시합니다.
  }
}

function mouseClicked() {
  // 이미지를 클릭했을 때 해당 이미지를 15배로 확대하여 중앙에 표시
  for (let i = 0; i < droppedImages.length; i++) {
    let imgSize = min(width, height) / 20;
    let x = 0;
    let y = i * imgSize;
    if (mouseX >= x && mouseX <= x + imgSize && mouseY >= y && mouseY <= y + imgSize) {
      clickedImageIndex = i;
    }
  }
}

function saveImagesToLocal() {
  // '저장' 텍스트를 클릭했을 때만 이미지를 로컬 스토리지에 저장
  localStorage.setItem('droppedImages', JSON.stringify(droppedImages));
}

function loadImagesFromLocal() {
  // '불러오기' 텍스트를 클릭했을 때만 로컬 스토리지에서 이미지를 불러옴
  let storedImages = localStorage.getItem('droppedImages');
  if (storedImages) {
    droppedImages = JSON.parse(storedImages);
  }
}
