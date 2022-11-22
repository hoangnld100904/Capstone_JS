function Validation() {
    this.kiemTraRong = function (val, idMess, idInp) {
        if (val.trim() == '') {
            getMyEle(idMess).style.display = 'block'
            getMyEle(idInp).style = 'border-color: #dc3545;'
            getMyEle(idMess).innerHTML = 'Dữ liệu không được để trống'
            return false
        }
        getMyEle(idMess).style.display = 'none'
        getMyEle(idInp).style = ''
        return true
    }

    this.kiemTraSo = function (val, idMess, idInp) {
        let reg = /\d+/g;
        if (val.match(reg)) {
            getMyEle(idMess).style.display = 'none'
            getMyEle(idInp).style = ''
            return true
        }
        getMyEle(idMess).style.display = 'block'
        getMyEle(idInp).style = 'border-color: #dc3545;'
        getMyEle(idMess).innerHTML = 'Dữ liệu nhập không phải là số'
        return false
    }

    this.kiemTraDuongDan = function(val, idMess, idInp) {
        let reg = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        if (val.match(reg)) {
            getMyEle(idMess).style.display = 'none'
            getMyEle(idInp).style = ''
            return true
        }
        getMyEle(idMess).style.display = 'block'
        getMyEle(idInp).style = 'border-color: #dc3545;'
        getMyEle(idMess).innerHTML = 'Đường dẫn url không hợp lệ'
        return false
    }

    this.kiemTraSelect = function(val, idMess, idInp) {
        if(val == 0){
            getMyEle(idMess).style.display = 'block'
            getMyEle(idInp).style = 'border-color: #dc3545;'
            getMyEle(idMess).innerHTML = 'Dữ liệu chọn không hợp lệ'
            return false
        }
        getMyEle(idMess).style.display = 'none'
        getMyEle(idInp).style = ''
        return true
    }


    }
