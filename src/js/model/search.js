require("@babel/polyfill"); // zarim asunc await zereg suuliin ueiin functionuudiig huuchin browser luu generete hiihed heregtei, zaaval code iin ehend hiij ugnu , ene bhgu bol regenator gesen aldaa zaana

import axios from "axios";

export default class Search {
	constructor(query) {
		this.query = query;
	}
	async doSearch() {
		try {
			let result = await axios(
				"https://forkify-api.herokuapp.com/api/search?q=" +
					this.query
			);
			this.result = result.data.recipes;

                return this.result;  

		} catch (error) {
			alert("asuudal garlaa: " + error);
		}
	}
}
