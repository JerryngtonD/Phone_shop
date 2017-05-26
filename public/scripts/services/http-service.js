class HttpService {
  static  getJSON(URL, successHandler) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', URL , true);

        xhr.onload = () => {
            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                let data = JSON.parse(xhr.responseText);

                successHandler(data);

            }
        };

        xhr.send();
    }
}