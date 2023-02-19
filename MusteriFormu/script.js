let tcKimlikNo = document.getElementById("tcKimlikNo");
    let ad = document.getElementById("ad");
    let soyad = document.getElementById("soyad");
    let dogumTarihi = document.getElementById("dogumTarihi");
    let bay = document.getElementById("rdbBay");
    let bayan = document.getElementById("rdbBayan");
    let dogumYeri = document.getElementById("dogumYeri");

    const musteriler = [];

    function tcKimlikNoValidator(){
        
        let kimlikNo = tcKimlikNo.value;

        if(kimlikNo.length !==11){
            return false;
        }

        if(kimlikNo.charAt(10) % 2 == 1){
            return false;
        }

        let toplam = 0;
        // 11 haneli TC kimlik no sayısının ilk 10 basamağının toplamını bulmak için
        for(let i=0; i < kimlikNo.length - 1 ; i++){
            let sayi =  Number(kimlikNo.charAt(i));
            toplam += sayi;
        }

        if( toplam % 10 != kimlikNo.charAt(10)){
            return false;
        }

        return true;

    }

    function validator(){
        if(ad.value === "" || soyad.value === "" || tcKimlikNo === ""){
            return false;
        }

        
        return true;
    }

    function kaydet(){

        let id = document.getElementById("hdnId").value;

        if(validator() === false){
            alert("ad, soyad ve TC Kimlik No alanları zorunludur!");
            return;
        }

        if(tcKimlikNoValidator() === false){
            alert("Hatalı T.C. Kimlik No");
            return;
        }

        let cinsiyet = "Bay";

        if(bayan.checked === true){
            cinsiyet = "Bayan";
        }

        let musteri;

        if(id === ""){

         musteri = {
            id:0,
            kimlikNo:tcKimlikNo.value,
            ad:ad.value,
            soyad:soyad.value, 
            dogumTarihi:dogumTarihi.value,
            cinsiyet:cinsiyet,
            dogumYeri:dogumYeri.value
        };

        musteriler.push(musteri);
        } else{
            alert("güncelle");
            musteri = musteriler[id-1];
            musteri.kimlikNo = document.getElementById("tcKimlikNo").value;
            musteri.ad = document.getElementById("ad").value;
            musteri.soyad = document.getElementById("soyad").value;
            musteri.dogumTarihi = document.getElementById("dogumTarihi").value;
            if(document.getElementById("rdbBay").checked === true){
                musteri.cinsiyet = "Bay";
            } else{
                musteri.cinsiyet = "Bayan";
            }

            musteri.dogumYeri = document.getElementById("dogumYeri").value;
        }
        tabloVerileriGoster();
        

        temizle();

       
    }

    function temizle(){
        tcKimlikNo.value = "";
        ad.value = "";
        soyad.value = "";
        dogumTarihi = Date.now();
        bay.checked = true;
        dogumYeri.value = "İstanbul";
    }

    function duzenle(id){
        let secilenMusteriIndex = id-1;
        const secilenMusteri = musteriler[secilenMusteriIndex];

        document.getElementById("hdnId").value = id;

        tcKimlikNo.value = secilenMusteri.kimlikNo;
        ad.value = secilenMusteri.ad;
        soyad.value = secilenMusteri.soyad;
        dogumTarihi.value = secilenMusteri.dogumTarihi;
        
        if(secilenMusteri.cinsiyet === "Bay"){
            bay.checked = true;
        } else{
            bayan.checked = true;
        }

        dogumYeri.value = secilenMusteri.dogumYeri;
    }

    function sil(id){
        if(confirm("Veriyi silmek istediğinize emin misiniz?") == false){
           return;
        } 
        let silinecekMusteriIndex = id-1;

        musteriler.splice(silinecekMusteriIndex,1);

        tabloVerileriGoster();

    }

    function tabloVerileriGoster(){
        let tablo = document.getElementById("customers");
        let siraNo = 0;

        for (let i = tablo.rows.length -1; i > 0; i-- ) {
            tablo.deleteRow(i);
            
        }

        for(let m of musteriler){
            let dt = "";

            if(m.dogumTarihi !== ""){
                dt = new Date(m.dogumTarihi).toLocaleDateString("tr-TR");
            }

            let row = tablo.insertRow();

            let cellSiraNo = row.insertCell();
            cellSiraNo.innerHTML = ++siraNo;
            m.id = siraNo;

            let cellKimlikNo = row.insertCell();
            cellKimlikNo.innerHTML = m.kimlikNo;

            let cellAd = row.insertCell();
            cellAd.innerHTML = m.ad;

            let cellSoyad = row.insertCell();
            cellSoyad.innerHTML = m.soyad;

            let cellDogumTarihi = row.insertCell();
            cellDogumTarihi.innerHTML = dt;

            let cellCinsiyet = row.insertCell();
            cellCinsiyet.innerHTML = m.cinsiyet;

            let cellDogumYeri = row.insertCell();
            cellDogumYeri.innerHTML = m.dogumYeri;

            let cellDuzenle = row.insertCell();
            cellDuzenle.innerHTML = `<a href="#" style="width:100px;" onclick="duzenle(${m.id})">Düzenle</a>`;

            let cellSil = row.insertCell();
            cellSil.innerHTML = `<a href="#" style="width:100px;" onclick="sil(${m.id})">Sil</a>`;
        }
    }