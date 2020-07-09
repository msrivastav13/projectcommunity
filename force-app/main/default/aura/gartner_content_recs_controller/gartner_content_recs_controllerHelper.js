({ 
    getRecommendations : function(cmp, event, helper) { 
        var URLName = window.location.pathname
        var lastIndex = (window.location.pathname).lastIndexOf("-") + 1
        var ID = URLName.slice(lastIndex)
        console.log(ID)
        const body = {
          "products": [
            {
              "id": ID
            }
          ],
            "cookieId": "gartner-cookie"
        };
        
        const init = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                 'Content-Type': 'application/json'
            }
        }
        console.log("about to get recommendations")
        return fetch('https://ai.salesforce.com/v3/personalization/recs/rtkm-Gartner-Content-Recs/text-sim-two?clientId=testKey', init)
        .then((response) => {
            //response.json().then((jsondata) => console.log('parsed json', jsondata))
            return response.json(); // or .json() or .blob() ...
        })
        .catch((e) => {
            console.log('error', e)
            // error in e.message
        });
   },         
            
   sendViewProduct: function(cmp, event, helper) { 
        var URLName = window.location.pathname
        console.log(URLName)
        var lastIndex = (window.location.pathname).lastIndexOf("-") + 1
        var ID = URLName.slice(lastIndex)
        const body = {
          "product": {
              "id": ID
          },
          "cookieId": "gartner-cookie",
        };
        
        const init = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                 'Content-Type': 'application/json'
            }
        }
        return fetch('https://ai.salesforce.com/v3/activities/rtkm-Gartner-Content-Recs/viewProduct?clientId=testKey', init)
        .then((response) => {
            return response.json(); // or .json() or .blob() ...
        })
        .catch((e) => {
            console.log('error', e)
            // error in e.message
        });
   }, 
            
    setRecsInPanel: function(cmp, number, articleTitle, imageTitle, urlTitle, ResponseDataRecs){
            var firstRec = JSON.stringify(ResponseDataRecs[number]);
            var firstRecObj = JSON.parse(firstRec);
        	console.log(firstRecObj);
            var firstRecName = firstRecObj["product_name"];
            var firstRecImage = firstRecObj["image_url"];
        	var imageUrl = 'https://' + window.location.host ;
        	imageUrl += ($A.util.isEmpty(cmp.get("v.communityPrefix"))) ? '' : '/'; 
        	imageUrl += cmp.get("v.communityPrefix");
        	imageUrl += firstRecImage.split(".com")[1];
        	firstRecImage = imageUrl;
            cmp.set(articleTitle, firstRecName);
        	console.log("image: ")
            console.log(firstRecImage)
          	cmp.set(imageTitle, firstRecImage); 
        	var articleURL = 'https://' + window.location.host;
        	articleURL += ($A.util.isEmpty(cmp.get("v.communityPrefix"))) ? '' : '/'; 
            articleURL += cmp.get("v.communityPrefix") + '/s/' + cmp.get("v.blogPageName") + '/';
        	//var articleURL = "https://win19ss-test1-165c68767ee-16c8e95a0d7.force.com/capricornjuices/s/blogs/";
        	articleURL += (firstRecObj["product_url"] + "-" + firstRecObj["id"]);
        	cmp.set(urlTitle, articleURL);
            console.log(articleURL)
    }
})