var apiKeyImage = "4b2de95543f833b19ea870c947b9424b"
var urlGit = "/Bottle"

// debug
// var urlGit = ""
window.onload = async function() {
    console.log('Current Version 2.125')
    console.log('12/3/2021 11:40 PM')

    function createSnow() {
        let s = ``
        for(let i = 0 ; i < 5; i++ ){
            s += `<div class="snowflake">
                    ❄
                  </div>`
        }
        $("#mySnow").html(s)
    }

    createSnow()

    let isLogin = localStorage.getItem("isLogin")
    let isDoneDefaultChallenge = localStorage.getItem("isDoneDefaultChallenge")

    let _isDoneDefaultChallenge = localStorage.getItem("_isDoneDefaultChallenge")

    if(_isDoneDefaultChallenge && window.location.pathname === urlGit + '/timer.html') {
        window.location.assign(urlGit + "/upload-image.html")
    }

    // nếu mà chưa login thì chỉ load màn hình default-challenge
    if(!isLogin && (window.location.pathname === urlGit + '/mychallenge.html' || window.location.pathname === urlGit + '/index.html')) {
        window.location.assign(urlGit + "/default-challenge.html")
    }

    // login rồi mà nó muốn vào login lại thì đẩy về trang chủ của nó
    if(isLogin && (window.location.pathname === urlGit + '/login.html' || window.location.pathname === urlGit + '/index.html' || window.location.pathname === urlGit + "/")) {
        window.location.assign(urlGit + "/mychallenge.html")
    }

    $("#file").on('change', async function() {
        let image = $('#file').prop('files')[0]
        if(image) {
            let base64 = await toBase64(image)
            $("#previewImage").css("display", "block")
            $("#previewImage").attr("src", base64)
        }
    })
    $("#btnRegister").click(async function() {
        $("#btnRegister").attr("disabled", true)
        let firstName = $("#firstName")
        let lastName = $("#lastName")
        let email = $("#email")
        let password = $("#password")

        if(!$('#file').prop('files')[0]) {
            toastr.error("Please choose your avatar")
            $("#btnRegister").attr("disabled", false)
            return null
        }

        if(!firstName.val() || !lastName.val() || !email.val() || !password.val()) {
            toastr.error("Please enter value correctly")
            $("#btnRegister").attr("disabled", false)
            return null
        }

        let users = await $.ajax({
                        method: 'GET',
                        url: 'https://5ce2c23be3ced20014d35e3d.mockapi.io/api/users'
        })

        let index = users.findIndex(user => user.email === email.val())

        if(index !== -1) {
            toastr.error("Email is used")
            $("#btnRegister").attr("disabled", false)
            return
        }

        if($('#file').prop('files')[0]) {
            let image = $('#file').prop('files')[0]
            let base64 = await toBase64(image)
            try {
                $("#previewImage").attr("src", base64)
                base64 = base64.slice(base64.indexOf(',')+1)
                
                let imageUpload = await $.ajax({
                    url: 'https://api.imgbb.com/1/upload',
                    method: 'POST',
                    data: {
                        key: apiKeyImage,
                        image: base64
                }})

                if(imageUpload.status === 200) {
                    const { display_url } = imageUpload.data

                    
                    let result = await $.ajax({
                        method: 'POST',
                        url: 'https://5ce2c23be3ced20014d35e3d.mockapi.io/api/users',
                        data: {
                            email: email.val(),
                            password: password.val(),
                            firstName: firstName.val(),
                            lastName: lastName.val(),
                            avatarUrl: display_url
                        }
                    })

                    if(result) {
                        toastr.success("Regiser successfully")
                        setTimeout(() => {
                            window.location.assign(urlGit + "/login.html")
                        }, 2000)
                    }
                }
            } catch (error) {
                toastr.error("Something wrong")
                console.log('error',error)
            }
        }

        $("#btnRegister").attr("disabled", false)
    })

    $("#btnLogin").click(async function() {
        let email = $("#email")
        let password = $("#password")

        if(!email.val() || !password.val()) {
            toastr.error("Please enter value correctly")
            return
        }

        let users = await $.ajax({
            method: 'GET',
            url: 'https://5ce2c23be3ced20014d35e3d.mockapi.io/api/users',
            data: {
                email: email.val()
            }
        })

        if(users && users.length > 0) {
            let currentUser = users[0]
            if(currentUser.password === password.val()) {
                localStorage.setItem("user", JSON.stringify(currentUser))
                localStorage.setItem("isLogin", true)
                localStorage.setItem("timeLogin", JSON.stringify(new Date()))
                toastr.success("Login successfully")
                window.location.assign(urlGit + "/mychallenge.html")
            } else {
                toastr.error("Email or password is not correct")
            }
        } else {
            toastr.error("Email or password is not correct")
        }
    })

    $("#getLocation").click(async function() {
        window.location.assign(urlGit + "/location.html")
    })

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    switch(window.location.pathname) {
        case urlGit + '/default-challenge.html':
            await addEventForDefaultChallengePage()
            break
        case urlGit + '/mychallenge.html':
            await addEventForMyChallengePage()
            break
        case urlGit + '/timer.html':
            await addEventForTimer()
            break
        case urlGit + '/ranking.html':
            await addEventForRanking()
    }

    // cho debug code
    // await addEventForDefaultChallengePage()
    // await addEventForMyChallengePage()
    // await addEventForTimer()
    // await addEventForRanking()

    $("#startMyChallenge").click(async function() {
        // khi người dùng trong trang timer và họ click nút này

        let minute = $("#minute")
        let second = $("#second")

        if(!minute.val() || !second.val()) {
            toastr.error("Please enter time")
            return
        }

        // chưa chặn được case số float

        if(minute.val() < 0 || minute.val() > 60 || second.val() < 0 || second.val() > 60 ) {
            minute.val("")
            second.val("")
            toastr.error("Please correct time minute : second")
            return
        }

        let endTime = moment(new Date())
        endTime = endTime.add(parseInt(minute.val()), "m")
        endTime = endTime.add(parseInt(second.val()), "s")
        console.log(endTime.format("m:s"))
        console.log(minute.val(), second.val())

        localStorage.setItem("_isProcessChallenge", true)
        localStorage.setItem("_timeEnd", endTime.toString())
        localStorage.setItem("_minuteDefaultChallenge", minute.val())
        localStorage.setItem("_secondDefaultChallenge", second.val())
        $("#startMyChallenge").css("display", "none")
        $("#minute").attr("disabled", true)
        $("#second").attr("disabled", true)

        let intervalTime = null 
        await new Promise((resolve) => {
            intervalTime = setInterval(() => {
                console.log(endTime.format("m:s"))
                // $("#timeEnd").innerHTML = endTime.format("m:s")
                if(endTime < moment(new Date())) {
                    resolve()
                } else {
                    console.log(endTime, moment(new Date()))
                    $("#timeEnd").text("Estimate end time: " + endTime.format("hh:mm:ss"))
                }
            }, 1000)
        })

        clearInterval(intervalTime)
        console.log('Done success')
        toastr.success("Congratulation! You have done challenge")
        localStorage.setItem("_isDoneDefaultChallenge", true)

        setTimeout(() => {
            window.location.assign(urlGit + "/upload-image.html")
        }, 1000)

        localStorage.removeItem("_isProcessChallenge")
        localStorage.removeItem("_timeEnd")
        localStorage.removeItem("_minuteDefaultChallenge")
        localStorage.removeItem("_secondDefaultChallenge")
        $("#minute").attr("disabled", false)
        $("#second").attr("disabled", false)
        $("#minute").val("")
        $("#second").val("")
        $("#startMyChallenge").css("display", "block")
    })

    $("#_file").on('change', async function() {
        if($('#_file').prop('files')[0]) {
            let image = $('#_file').prop('files')[0]
            let base64 = await toBase64(image)
            try {
                $("#previewImage").attr("src", base64)
                $("#previewImage").css("display", "block")
                base64 = base64.slice(base64.indexOf(',')+1)
                
                let imageUpload = await $.ajax({
                    url: 'https://api.imgbb.com/1/upload',
                    method: 'POST',
                    data: {
                        key: apiKeyImage,
                        image: base64
                }})

                if(imageUpload.status === 200) {
                    const { display_url } = imageUpload.data

                    // ghi nhận nó vào challenge của users

                    let currentUser = JSON.parse(localStorage.getItem("user"))
                    let currentChallenge = JSON.parse(localStorage.getItem("currentChallenge"))

                    let result = await $.ajax({
                        method: 'POST',
                        url: `https://5ce2c23be3ced20014d35e3d.mockapi.io/api/users/${currentUser.id}/challenge`,
                        data: {
                            item: currentChallenge,
                            imageUrl: display_url
                        }
                    })

                    if(result) {
                        localStorage.removeItem("_isDoneDefaultChallenge")
                        localStorage.removeItem("currentChallenge")

                        toastr.success("Done successfully")
                        setTimeout(() => {
                            window.location.assign(urlGit + "/mychallenge.html")
                        }, 2000)
                    }
                }
            } catch (error) {
                toastr.error("Something wrong")
                console.log('error',error)
            }
        }
    })

    $("#logoutLink").click(function() {
        localStorage.clear()
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    })
}

async function addEventForRanking() {
    let users = await $.ajax({
        method: 'GET',
        url: 'https://5ce2c23be3ced20014d35e3d.mockapi.io/api/users'
    })
    console.log(users)

    let arrayRanking = []
    for(let i = 0 ; i < users.length; i++) {
        let sum = 0
        for(let j = 0; j < users[i].challenge.length; j++) {
            sum += parseInt(users[i].challenge[j]["item[score]"])
        }
        arrayRanking.push({
            username: users[i].email,
            score: sum
        })
    }

    arrayRanking.sort((a,b) => b.score - a.score)
    let s = ``
    for(let i = 0 ; i < arrayRanking.length; i++) {
        s += `<tr>
                <td style="color: #fff; background-color: #555;padding: 12px 6px; font-weight: bold">${i + 1}</td>
                <td style="color: #fff; background-color: #555;padding: 12px 6px;">
                    <div title="${arrayRanking[i].username}" style="white-space: nowrap; width: 200px; overflow: hidden; text-overflow: ellipsis;">${arrayRanking[i].username}</div>
                </td>
                <td style="color: #fff; background-color: #555;padding: 12px 6px">${arrayRanking[i].score}</td>
            </tr>`
    }

    $("#tbody").html(s)

    console.log(arrayRanking)
}

async function addEventForTimer() {
    // nếu người dùng quay lại trang này coi thì load mninute và second
    // xong thì chuyển hướng đi

    let _isProcessChallenge = localStorage.getItem("_isProcessChallenge")

    if(_isProcessChallenge === "true") {
        $("#startMyChallenge").css("display", "none")
        $("#minute").attr("disabled", true)
        $("#second").attr("disabled", true)
        let minute = localStorage.getItem("_minuteDefaultChallenge")
        let second = localStorage.getItem("_secondDefaultChallenge")
        
        $("#minute").val(minute)
        $("#second").val(second)

        let endTime  =  localStorage.getItem("_timeEnd")
        if(endTime) {
            endTime = moment(endTime)
            let intervalTime = null 
            await new Promise((resolve) => {
                intervalTime = setInterval(() => {
                    console.log(endTime.format("m:s"))
                    // $("#timeEnd").innerHTML = endTime.format("m:s")
                    if(endTime < moment(new Date())) {
                        resolve()
                    } else {
                        console.log(endTime, moment(new Date()))
                        $("#timeEnd").text("Estimate end time: " + endTime.format("hh:mm:ss"))
                    }
                }, 1000)
            })

            clearInterval(intervalTime)
            console.log('Done success')
            toastr.success("Congratulation! You have done challenge")
            localStorage.setItem("_isDoneDefaultChallenge", true)
            setTimeout(() => {
                window.location.assign(urlGit + "/upload-image.html")
            }, 1000)

            localStorage.removeItem("_isProcessChallenge")
            localStorage.removeItem("_timeEnd")
            localStorage.removeItem("_minuteDefaultChallenge")
            localStorage.removeItem("_secondDefaultChallenge")
            $("#minute").attr("disabled", false)
            $("#second").attr("disabled", false)
            $("#minute").val("")
            $("#second").val("")
            $("#startMyChallenge").css("display", "block")
        }
    }
}

async function addEventForMyChallengePage() {
    let _isProcessChallenge = localStorage.getItem("_isProcessChallenge")

    if(!_isProcessChallenge) {
        $("#checkDone").css("display", "none")
        $("#startChallenge").click(function() {
            window.location.assign(urlGit + "/timer.html")
        })
    
        let challenge = await $.ajax({
            url: 'https://5ce2c23be3ced20014d35e3d.mockapi.io/api/challenge',
            method: 'GET'
        })
        console.log(challenge)
        let userLocal = localStorage.getItem("user")
        userLocal = JSON.parse(userLocal)
        let user = await $.ajax({
            url: 'https://5ce2c23be3ced20014d35e3d.mockapi.io/api/users/' + userLocal.id,
            method: 'GET'
        })
        console.log(user)
        let currentChallenge = null
        for(let i = 0; i < challenge.length; i++) {
            let index = user.challenge.findIndex(_i => _i["item[id]"] === challenge[i].id)
            if(index === -1) {
                currentChallenge = challenge[i]
            }
        }
    
        console.log(currentChallenge)
        console.log(user)

        // hiển thị challenge lên nè
        if(currentChallenge) {
            console.log(currentChallenge)
            localStorage.setItem("currentChallenge", JSON.stringify(currentChallenge))
            $("#nameChallenge").text(currentChallenge.name)
            $("#scoreChallenge").text(`You got ${currentChallenge.score} points, yayy!!!`)
        } else {
            toastr.success("User has been done all challenge")
            setTimeout(() => {
                window.location.assign(urlGit + "/ranking.html")
            }, 1000)
        }
    } else {
        let currentChallenge = JSON.parse(localStorage.getItem("currentChallenge"))
        if(currentChallenge) {
            $("#nameChallenge").text(currentChallenge.name)
            $("#scoreChallenge").text(`You got ${currentChallenge.score} points, yayy!!!`)
        }
        $("#startChallenge").css("display", "none")
        $("#checkDone").click(function() {
            window.location.assign(urlGit + "/timer.html")
        })
    }
}

async function addEventForDefaultChallengePage() {
    // let challenge = await $.ajax({
    //     url: 'https://5ce2c23be3ced20014d35e3d.mockapi.io/api/challenge',
    //     method: 'GET'
    // })

    let isProcessChallenge = localStorage.getItem("isProcessChallenge")

    if(isProcessChallenge == "true") {
        $("#startChallenge").css("display", "none")
        $("#minute").attr("disabled", true)
        $("#second").attr("disabled", true)
        let minute = localStorage.getItem("minuteDefaultChallenge")
        let second = localStorage.getItem("secondDefaultChallenge")
        
        $("#minute").val(minute)
        $("#second").val(second)

        let endTime  =  localStorage.getItem("timeEnd")
        if(endTime) {
            endTime = moment(endTime)
            let intervalTime = null 
            await new Promise((resolve) => {
                intervalTime = setInterval(() => {
                    console.log(endTime.format("m:s"))
                    // $("#timeEnd").innerHTML = endTime.format("m:s")
                    if(endTime < moment(new Date())) {
                        resolve()
                    } else {
                        console.log(endTime, moment(new Date()))
                        $("#timeEnd").text("Estimate end time: " + endTime.format("hh:mm:ss"))
                    }
                }, 1000)
            })

            clearInterval(intervalTime)
            console.log('Done success')
            toastr.success("Congratulation! You have done challenge")
            localStorage.setItem("isDoneDefaultChallenge", true)
            setTimeout(() => {
                window.location.assign(urlGit + "/success-default-challenge.html")
            }, 1000)

            localStorage.removeItem("isProcessChallenge")
            localStorage.removeItem("timeEnd")
            localStorage.removeItem("minuteDefaultChallenge")
            localStorage.removeItem("secondDefaultChallenge")
            $("#minute").attr("disabled", false)
            $("#second").attr("disabled", false)
            $("#minute").val("")
            $("#second").val("")
            $("#startChallenge").css("display", "block")
        }
    } else {
        $("#startChallenge").click(async function() {
            let minute = $("#minute")
            let second = $("#second")

            if(!minute.val() || !second.val()) {
                toastr.error("Please enter time")
                return
            }

            // chưa chặn được case số float

            if(minute.val() < 0 || minute.val() > 60 || second.val() < 0 || second.val() > 60 ) {
                minute.val("")
                second.val("")
                toastr.error("Please correct time minute : second")
                return
            }

            let endTime = moment(new Date())
            endTime = endTime.add(parseInt(minute.val()), "m")
            endTime = endTime.add(parseInt(second.val()), "s")
            console.log(endTime.format("m:s"))
            console.log(minute.val(), second.val())

            localStorage.setItem("isProcessChallenge", true)
            localStorage.setItem("timeEnd", endTime.toString())
            localStorage.setItem("minuteDefaultChallenge", minute.val())
            localStorage.setItem("secondDefaultChallenge", second.val())
            $("#startChallenge").css("display", "none")
            $("#minute").attr("disabled", true)
            $("#second").attr("disabled", true)

            let intervalTime = null 
            await new Promise((resolve) => {
                intervalTime = setInterval(() => {
                    console.log(endTime.format("m:s"))
                    // $("#timeEnd").innerHTML = endTime.format("m:s")
                    if(endTime < moment(new Date())) {
                        resolve()
                    } else {
                        console.log(endTime, moment(new Date()))
                        $("#timeEnd").text("Estimate end time: " + endTime.format("hh:mm:ss"))
                    }
                }, 1000)
            })

            clearInterval(intervalTime)
            console.log('Done success')
            toastr.success("Congratulation! You have done challenge")
            localStorage.setItem("isDoneDefaultChallenge", true)

            setTimeout(() => {
                window.location.assign(urlGit + "/success-default-challenge.html")
            }, 1000)

            localStorage.removeItem("isProcessChallenge")
            localStorage.removeItem("timeEnd")
            localStorage.removeItem("minuteDefaultChallenge")
            localStorage.removeItem("secondDefaultChallenge")
            $("#minute").attr("disabled", false)
            $("#second").attr("disabled", false)
            $("#minute").val("")
            $("#second").val("")
            $("#startChallenge").css("display", "block")
        })
    }
}