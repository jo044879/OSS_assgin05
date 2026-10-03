let products = [
    {
        id: 1,
        productName: "무선 블루투스 이어폰",
        productNum: "ITEM-001",
        price: 65000,
        market: "A사운드 공식몰",
        address: "서울시",
        category: "전자제품"
    },
    {
        id: 2,
        productName: "인체공학 무선 마우스",
        productNum: "ITEM-002",
        price: 32000,
        market: "오피스디포",
        address: "경기도",
        category: "전자제품"
    },
    {
        id: 3,
        productName: "32인치 4K 모니터",
        productNum: "ITEM-003",
        price: 380000,
        market: "전자랜드",
        address: "부산",
        category: "전자제품"
    }
];

// 다음 ID를 결정하기 위한 카운터
let nextId = 4;

// 수정 중인 항목의 ID (-1이면 추가 모드)
let editingId = -1;


const inputName     = document.getElementById("inputName");
const inputNum      = document.getElementById("inputNum");
const inputPrice    = document.getElementById("inputPrice");
const inputMarket   = document.getElementById("inputMarket");
const inputAddress  = document.getElementById("inputAddress");
const inputCategory = document.getElementById("inputCategory");
const submitBtn     = document.getElementById("submitBtn");
const cancelBtn     = document.getElementById("cancelBtn");
const formTitle     = document.getElementById("formTitle");
const tableBody     = document.getElementById("productTableBody");

function render() {
    // 기존 테이블 내용 초기화
    tableBody.innerHTML = "";

    if (products.length === 0) {
        // 데이터가 없을 때 안내 메시지 출력
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 8;
        td.className = "empty-msg";
        td.innerText = "등록된 상품이 없습니다.";
        tr.appendChild(td);
        tableBody.appendChild(tr);
        return;
    }

    // forEach로 배열 전체를 순회하며 행 생성
    products.forEach(function (p) {
        const tr = document.createElement("tr");

        // 각 셀 데이터 배열 (순서: ID, 상품명, 상품번호, 가격, 매장명, 배송지, 카테고리)
        const cells = [
            p.id,
            p.productName,
            p.productNum,
            p.price.toLocaleString() + "원",
            p.market,
            p.address,
            p.category
        ];

        cells.forEach(function (val) {
            const td = document.createElement("td");
            td.innerText = val;
            tr.appendChild(td);
        });

        // 수정 / 삭제 버튼 셀
        const tdAction = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.innerText = "수정";
        editBtn.className = "btn-edit";
        editBtn.addEventListener("click", function () {
            startEdit(p.id);
        });

        const delBtn = document.createElement("button");
        delBtn.innerText = "삭제";
        delBtn.className = "btn-del";
        delBtn.addEventListener("click", function () {
            deleteProduct(p.id);
        });

        tdAction.appendChild(editBtn);
        tdAction.appendChild(delBtn);
        tr.appendChild(tdAction);

        tableBody.appendChild(tr);
    });
}


function validate() {
    if (inputName.value.trim() === "") {
        alert("상품명을 입력하세요.");
        inputName.focus();
        return false;
    }
    if (inputName.value.trim().length < 2) {
        alert("상품명은 2자 이상 입력하세요.");
        inputName.focus();
        return false;
    }

    if (inputNum.value.trim() === "") {
        alert("상품번호를 입력하세요.");
        inputNum.focus();
        return;
    }

    const priceVal = Number(inputPrice.value);
    if (inputPrice.value.trim() === "" || isNaN(priceVal)) {
        alert("가격을 숫자로 입력하세요.");
        inputPrice.focus();
        return;
    }
    if (priceVal < 0) {
        alert("가격은 0원 이상이어야 합니다.");
        inputPrice.focus();
        return;
    }

    if (inputMarket.value.trim() === "") {
        alert("매장명을 입력하세요.");
        inputMarket.focus();
        return;
    }

    if (inputAddress.value.trim() === "") {
        alert("배송지를 입력하세요.");
        inputAddress.focus();
        return false;
    }

    if (inputCategory.value === "") {
        alert("카테고리를 선택하세요.");
        inputCategory.focus();
        return false;
    }

    return true;
}


function addProduct() {
    if (!validate()) return;

    products.push({
        id: nextId++,
        productName: inputName.value.trim(),
        productNum:  inputNum.value.trim(),
        price:       Number(inputPrice.value),
        market:      inputMarket.value.trim(),
        address:     inputAddress.value.trim(),
        category:    inputCategory.value
    });

    clearForm();
    render();
}

function startEdit(id) {
   
    const target = products.find(function (p) {
        return p.id === id;
    });
    if (!target) return;


    inputName.value     = target.productName;
    inputNum.value      = target.productNum;
    inputPrice.value    = target.price;
    inputMarket.value   = target.market;
    inputAddress.value  = target.address;
    inputCategory.value = target.category;

    editingId = id;
    formTitle.innerText   = "상품 수정";
    submitBtn.innerText   = "저장";
    cancelBtn.style.display = "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
    inputName.focus();
}

function updateProduct() {
    if (!validate()) return;

    const target = products.find(function (p) {
        return p.id === editingId;
    });
    if (!target) return;

    target.productName = inputName.value.trim();
    target.productNum  = inputNum.value.trim();
    target.price       = Number(inputPrice.value);
    target.market      = inputMarket.value.trim();
    target.address     = inputAddress.value.trim();
    target.category    = inputCategory.value;

    editingId = -1;
    formTitle.innerText     = "상품 추가";
    submitBtn.innerText     = "Add";
    cancelBtn.style.display = "none";

    clearForm();
    render();   // 화면 갱신
}

function deleteProduct(id) {
    // confirm()으로 삭제 여부 확인
    if (!confirm("삭제하시겠습니까?")) return;

    // filter()로 해당 id를 제외한 새 배열 생성
    products = products.filter(function (p) {
        return p.id !== id;
    });

    if (editingId === id) {
        editingId = -1;
        formTitle.innerText     = "상품 추가";
        submitBtn.innerText     = "Add";
        cancelBtn.style.display = "none";
        clearForm();
    }

    render();   // 화면 갱신
}

// [Add / 저장] 버튼
submitBtn.addEventListener("click", function () {
    if (editingId === -1) {
        addProduct();       // 추가 모드
    } else {
        updateProduct();    // 수정 모드
    }
});

cancelBtn.addEventListener("click", function () {
    editingId = -1;
    formTitle.innerText     = "상품 추가";
    submitBtn.innerText     = "Add";
    cancelBtn.style.display = "none";
    clearForm();
});

render();
