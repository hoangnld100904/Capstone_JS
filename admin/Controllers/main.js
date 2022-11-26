let spService = new SanPhamService()
let validation = new Validation()

function clearNotif(idMess, idInp) {
    getMyEle(idMess).style.display = 'none'
    getMyEle(idInp).style = ''
    getMyEle(idInp).value = ''
}

getMyEle('#openProduct').onclick = function () {
    clearNotif('.valid1','#inpName')
    clearNotif('.valid2','#inpPrice')
    clearNotif('.valid3','#inpScreen')
    clearNotif('.valid4','#inpBackCam')
    clearNotif('.valid5','#inpFrontCam')
    clearNotif('.valid6','#inpImg')
    clearNotif('.valid7','#inpDesc')
    clearNotif('.valid8','#inpType')
    getMyEle('.modal-footer').innerHTML = `<button type="button" class="btn btn-primary" onclick="themSanPham()" id="btnLuu">Lưu</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>`
}

function isValid(name,price,screen,backCamera,frontCamera,img,desc,type,getIndex) {
    var flag = true;
    flag &= validation.kiemTraRong(name,'.valid1','#inpName')
    flag &= validation.kiemTraRong(price,'.valid2','#inpPrice') && validation.kiemTraSo(price,'.valid2','#inpPrice')
    flag &= validation.kiemTraRong(screen,'.valid3','#inpScreen')
    flag &= validation.kiemTraRong(backCamera,'.valid4','#inpBackCam')
    flag &= validation.kiemTraRong(frontCamera,'.valid5','#inpFrontCam')
    flag &= validation.kiemTraRong(img,'.valid6','#inpImg') && validation.kiemTraDuongDan(img,'.valid6','#inpImg')
    flag &= validation.kiemTraRong(desc,'.valid7','#inpDesc') 
    flag &= validation.kiemTraRong(type,'.valid8','#inpType') && validation.kiemTraSelect(getIndex,'.valid8','#inpType')
    return flag
}

function themSanPham() {//name,price,screen,backCamera,frontCamera,img,desc,type
    let name = getMyEle('#inpName').value
    let price = getMyEle('#inpPrice').value
    let screen = getMyEle('#inpScreen').value
    let backCamera = getMyEle('#inpBackCam').value
    let frontCamera = getMyEle('#inpFrontCam').value
    let img = getMyEle('#inpImg').value
    let desc = getMyEle('#inpDesc').value
    let type = getMyEle('#inpType').value
    let getIndex = getMyEle('#inpType').selectedIndex
    let sp = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type)
    let isSuccess = isValid(name,price,screen,backCamera,frontCamera,img,desc,type,getIndex)
    if (isSuccess) {
        spService.themSP(sp).then(function (result) {
            getMyEle('.modal-header .close').click()
            layDanhSachSP()
        })
            .catch(function (error) {

            })
    }

}

function getMyEle(select) {
    return document.querySelector(select)
}

function layDanhSachSP() {
    spService.layDSSP().then(function (reult) {
        renderSP(reult.data)
    })
}
layDanhSachSP()

function renderSP(mang) {
    let content = '';
    let count = 0;
    mang.map(function (sp) {
        content += `<tr>
        <td scope="row">${++count}</td>
        <td scope="row">${sp.name}</td>
        <td scope="row">${sp.price}</td>
        <td scope="row"><img src="${sp.img}" alt="img" class="img-fluid";
        height: auto;"</td>
        <td scope="row">${sp.desc}</td>
        <td scope="row" class="d-flex justify-content-center"><button class="btn btn-danger mr-2" onclick="xoaSP(${sp.id})">Xóa</button>
        <button class="btn btn-success" onclick="xemChiTiet(${sp.id})">Xem</button>
        </td>
        </tr>`
    })
    getMyEle('#tblDanhSachSP').innerHTML = content;
}

function xoaSP(id) {
    spService.xoaSP(id).then(function (result) {
        layDanhSachSP()
    })
}

function capNhatSanPham(id) {
    let name = getMyEle('#inpName').value
    let price = getMyEle('#inpPrice').value
    let screen = getMyEle('#inpScreen').value
    let backCamera = getMyEle('#inpBackCam').value
    let frontCamera = getMyEle('#inpFrontCam').value
    let img = getMyEle('#inpImg').value
    let desc = getMyEle('#inpDesc').value
    let type = getMyEle('#inpType').value
    let spCapNhat = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type)
    spService.capNhatSP(spCapNhat, id).then(function (result) {
        getMyEle('.modal-header .close').click()
        layDanhSachSP()
    })
}

function xemChiTiet(id) {
    spService.xemChiTiet(id).then(function (result) {
        getMyEle('#openProduct').click()
        getMyEle('#btnLuu').style = 'display:none'
        getMyEle('.modal-footer').innerHTML = `<button class="btn btn-success" id="btnCapNhat" onclick="capNhatSanPham(${id})">Cập nhật</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>`
        getMyEle('#inpName').value = result.data.name
        getMyEle('#inpPrice').value = result.data.price
        getMyEle('#inpScreen').value = result.data.screen
        getMyEle('#inpBackCam').value = result.data.backCamera
        getMyEle('#inpFrontCam').value = result.data.frontCamera
        getMyEle('#inpImg').value = result.data.img
        getMyEle('#inpDesc').value = result.data.desc
        getMyEle('#inpType').value = result.data.type.toLowerCase()// viết về chữ hoa để so sánh
        console.log(result.data.type)
    })
}