import mockData from './mock-data';



/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
 const response = await fetch(
   `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
 );
 const result = await response.json();
 return result;
};

/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async () => {
  //Check if user is offline
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    return events ? JSON.parse(events) : [];
  }

  // Use mockData for localhost
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = "https://vq574vxar5.execute-api.us-west-1.amazonaws.com/dev/api/get-events" + "/" + token;
    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      //Save to localStorage
     //NProgress.done(); 
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    } else {
      return null;
    }
  }
};


export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));


 if (!accessToken || tokenCheck.error) {
   await localStorage.removeItem("access_token");
   const searchParams = new URLSearchParams(window.location.search);
   const code = await searchParams.get("code");
   if (!code) {
     const response = await fetch(
       "https://vq574vxar5.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url"
     );

     
     const result = await response.json();
     const { authUrl } = result;
     return (window.location.href = authUrl);
   }
   return code && getToken(code);
 }
 return accessToken
};

const removeQuery = () => {
 let newurl;
 if (window.history.pushState && window.location.pathname) {
   newurl =
     window.location.protocol +
     "//" +
     window.location.host +
     window.location.pathname;
   window.history.pushState("", "", newurl);
 } else {
   newurl = window.location.protocol + "//" + window.location.host;
   window.history.pushState("", "", newurl);
 }
};

const getToken = async (code) => {
 const encodeCode = encodeURIComponent(code);
 const response = await fetch(
   ' https://vq574vxar5.execute-api.us-west-1.amazonaws.com/dev/api/token' + '/' + encodeCode
 );
 const { access_token } = await response.json();
 access_token && localStorage.setItem("access_token", access_token);


 return access_token;
};
