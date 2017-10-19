// class HttpService {
//   static  getJSON(URL) {
//       return new Promise (
//           (resolve, reject) => {
//               let xhr = new XMLHttpRequest();
//
//               xhr.open('GET', URL , true); //асинхронный запрос на URL
//
//               xhr.onload = () => {
//                   if (xhr.status !== 200) {
//                       reject(xhr.status + ': ' + xhr.statusText);
//                   } else {
//                       let data = JSON.parse(xhr.responseText);
//
//                       resolve(data);
//
//                   }
//               };
//
//               xhr.onerror = (error) => {
//                   reject(error)
//               };
//
//               xhr.send();
//           }
//       );
//
//     }
// }
//

