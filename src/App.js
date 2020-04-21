import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {

  const [news, setNews] = useState([])
  const [searchQuery, setSearchQuery] = useState('react')
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
  const [loading, setLoading] = useState(false)

  const fetchNews = async () => {
    try {
      setLoading(true)
      const data = await fetch(url)
      const response = await data.json()
      setNews(response.hits)
      setLoading(false)
    }
    catch (err) {
      console.log(err.message)
    }
  }

  //-----------//
  //---HOOKS---//
  //-----------//
  useEffect(() => {
    fetchNews()
  }, [url])

  //--------------//
  //---HANDLERS---//
  //--------------//
  const handleChange = e => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  //----------------//
  //---COMPONENTS---//
  //----------------//
  const showLoading = () => loading ? <h3>Loading...</h3> : ""

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChange} onFocus={e => e.target.value = ''} />
      <button>Search</button> 
    </form>
  )

  const showNews = () => (
    news.map((article, index) => (
      <p key={index}>{article.title} <a href={article.url}>LINK</a></p>
    ))
  )

  const Footer = () =>  (
      <p className="footer">Copyright &copy; 2020 Roberto Castelli</p>
    )
  
  //------------//
  //---RENDER---//
  //------------//
  return (
    <div className="container">
      <h1>TECH NEWS</h1>
      {searchForm()}
      <h3>n°{news.length} ARTICLES</h3>
      {showLoading()}
      {showNews()}
      <hr/>
      <Footer />
    </div>
  );
}
