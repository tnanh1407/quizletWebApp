let cardCount = 0;

function addCard() {
    cardCount++;
    const cardDiv = document.createElement("div");
    cardDiv.className = "flashcard";
    cardDiv.innerHTML = `
    <span class="card-number"></span>
    <input type="text" placeholder="Thuật ngữ">
    <input type="text" placeholder="Định nghĩa">
    <button class="remove-btn" onclick="removeCard(this)">×</button>
    `;
    document.getElementById("cards").appendChild(cardDiv);
    updateCardNumbers();
}

function removeCard(btn) {
    btn.parentElement.remove();
    updateCardNumbers();
}

function updateCardNumbers() {
  document.querySelectorAll(".flashcard").forEach((card, index) => {
    card.querySelector(".card-number").textContent = index + 1;
  });
}


function saveSet() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const cards = [];
    document.querySelectorAll(".flashcard").forEach(card => {
    const term = card.children[0].value;
    const definition = card.children[1].value;
    if(term && definition) {
        cards.push({term, definition});
    }
    });
    console.log("Bộ thẻ:", {title, description, cards});
    alert("Đã lưu bộ thẻ! Xem dữ liệu trong console.");
}

document.getElementById("import-btn").addEventListener("click", function() {
  // Điều hướng đến trang nhập dữ liệu
  // (tạm thời chuyển trang, bạn sẽ mô tả giao diện sau)
  window.location.href = "import.html"; 
});

document.getElementById("del-all-btn").addEventListener("click", function() {
  const confirmDelete = confirm("Xóa học phần này?\nHành động này sẽ xóa và loại bỏ học phần khỏi thư viện của bạn. Bạn không thể hoàn tác.");
  if (confirmDelete) {
    // Xóa toàn bộ thẻ
    document.getElementById("cards").innerHTML = "";
    alert("Đã xóa toàn bộ học phần.");
  }
});


// tạo thẻ mặc định ban đầu
addCard();
addCard();