({
    thirdpartyClientCall : function(cmp, event, helper) { 
        helper.getRecommendations(cmp, event, helper)
        .then((data) => {
            console.log("just tried to get recs")
        	var ResponseData = (JSON.stringify(data));
            console.log("Response data:")
  			
            var ResponseDataObj = JSON.parse(ResponseData);
            var ResponseDataRecs = ResponseDataObj['recs'];
            helper.setRecsInPanel(cmp, 0, "v.title1", "v.imgGoesHere1", "v.urlGoesHere1", ResponseDataRecs)
            helper.setRecsInPanel(cmp, 1, "v.title2", "v.imgGoesHere2", "v.urlGoesHere2", ResponseDataRecs)
            helper.setRecsInPanel(cmp, 2, "v.title3", "v.imgGoesHere3", "v.urlGoesHere3", ResponseDataRecs)
			
        })
        .catch((e) => {
            console.log('error', e)
            // error in e.message
        });
        //helper.sendViewProduct(cmp, event, helper)
    },
})