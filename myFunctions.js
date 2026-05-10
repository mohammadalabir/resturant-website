function showForm(){
  document.getElementById("formSection").style.display = "block";
}

function validateForm(){
  let name = document.getElementById("name").value.trim();
  let acc = document.getElementById("account").value.trim();
  let phone = document.getElementById("phone").value.trim();


  let date = document.getElementById("date").value.trim();

  if (date !== "") {
    let dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!dateRegex.test(date)) {
      alert("التاريخ غير صحيح، يجب أن يكون بالشكل: yyyy-mm-dd مثال: 2024-12-31");
      return false;
    }
    // التحقق من أن التاريخ منطقي فعلاً
    let d = new Date(date);
    if (isNaN(d.getTime())) {
      alert("التاريخ غير صحيح");
      return false;
    }
  }
  if (!/^[0-9]{6}$/.test(acc)) {
    alert("رقم الحساب المصرفي يجب أن يكون مكوناً من 6 أرقام");
    return false;
  }

if (name !== "" && !/^[A-Za-z]+ [A-Za-z]+$/.test(name)) {
      alert("الاسم غير صحيح");
    return false;
  }

  if (phone !== "" && !/^09\d{8}$/.test(phone)) {
    alert("الهاتف غير صحيح");
    return false;
  }

  calculateBill();
  return false;
}

function calculateBill(){
  let total = 0; 
  let mealsInfo = []; 

  document.querySelectorAll(".meal:checked").forEach(el => {
    let price = parseFloat(el.dataset.price) || 0;
    let mealName = el.dataset.name || "وجبة";
    total += price;
    mealsInfo.push(mealName + " (" + price + " ل.س)");
  });

  if (mealsInfo.length === 0) {
    alert("الرجاء اختيار وجبة واحدة على الأقل");
    return;
  }

  let gross = total;
  let tax = gross * 0.1;
  let net = gross - tax;

  let msg = "=== تفاصيل طلبك ===\n";
  msg += "الوجبات المختارة:\n- " + mealsInfo.join("\n- ") + "\n\n";
  msg += "المجموع الإجمالي: " + gross + " ل.س\n";
  msg += "مبلغ الضريبة (10%): " + tax + " ل.س\n";
  msg += "المبلغ الصافي بعد حسم الضريبة: " + net + " ل.س";

  alert(msg);

  document.getElementById("result").innerHTML =
    "<h3>تفاصيل طلبك</h3>" +
    "<p><b>الوجبات المختارة:</b> " + mealsInfo.join(" | ") + "</p>" +
    "<p><b>المجموع الإجمالي:</b> " + gross + " ل.س</p>" +
    "<p><b>مبلغ الضريبة (10%):</b> " + tax + " ل.س</p>" +
    "<p><b>المبلغ الصافي بعد حسم الضريبة:</b> " + net + " ل.س</p>";
}
