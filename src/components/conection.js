import { NavigationActions } from 'react-navigation';
import {
  AsyncStorage,
  Alert,
} from 'react-native';
import axios from 'axios';

let host = 'Url webservice';

let HttpService = {
    apiURL: host + '/api',
    imgURL: host + '/uploads/avatars/',
    navigation: null,


    extractGetParams: function (params, token){
        let extractedParams = "?";
        for(let i=0; i<params.length; i++){
            if(i!==0){
                extractedParams += "&"
            }
            extractedParams += params[i].key+"="+params[i].value;
        }
        return extractedParams;
    },

    getAsync: async function(endpoint, token, params = []) {
      let url = this.apiURL + endpoint + this.extractGetParams(params, token);
      let headers = {};

      if(token !== null) {
          headers.Authorization = 'Bearer '+token;
      }

      return new Promise((resolve) => {
        axios.get(url, {headers: headers}).then((response) => {
          resolve(response.data);
        }).catch((error) => this.conectionError(resolve, error));
      });
    },

    postAsync: async function (endpoint, token, params = {}) {
        let url = this.apiURL + endpoint;
        let headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };

        if(token !== null) {
          headers.Authorization = 'Bearer ' + token;
        }

        return new Promise((resolve) => {
          axios.post(url, params, {headers}).then((response) => {
            resolve(response.data);
          }).catch((error) => this.conectionError(resolve, error));
      });
    },

    conectionError: async function(resolve, error) {
      console.log('ERROR: ', error);
      resolve(false);
      setTimeout(() => {
        if (this.navigation) {
          this.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login', params: { noAutoLogin: true}})],
          }));
          setTimeout(() => {
            this.navigation = null
            Alert.alert('Falha na conexão', 'Por favor, verifique sua conexão com a internet');
          }, 700);
        }
      }, 500);
    },
};


function erroDados(){

    alert('sua sessão expirou, por favor logue-se novamente!');
    AsyncStorage.clear(); //this.navigator.immediatelyResetStack([Router.getRoute('main')], 0);


 }

export default HttpService;
