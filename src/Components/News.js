import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor() {
        super();
        // console.log("Hello I am constructor from news components");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=d0ab993a75f84fb68e0bbc0b55d2f906&page=1&pageSize=18";
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })

    }

    handlePrev = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d0ab993a75f84fb68e0bbc0b55d2f906&page=${this.state.page - 1}&pageSize=18`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
        })
    }

    handleNext = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d0ab993a75f84fb68e0bbc0b55d2f906&page=${this.state.page + 1}&pageSize=18`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
            })
        }
    }

    render() {
        return (
            <>
                <h2 className="display-4 text-danger d-flex justify-content-center">Top Headlines</h2>
                <div className="container justify-content-center">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem key={element.url} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 45) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mx-2" onClick={this.handlePrev}>&larr; Prev</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark mx-2" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </>
        )
    }
}
