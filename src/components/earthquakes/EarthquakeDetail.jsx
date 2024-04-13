import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { CommentSection } from "react-comments-section"
import "react-comments-section/dist/index.css"
import { FORM_ERROR } from "final-form"

import { request } from "../../api/apiCore.jsx"
import PreviewLink from "../ui/PreviewLink.jsx"
import CardInfo from "../ui/CardInfo.jsx"

export const EarthquakeDetail= () => {
  const { id } = useParams()
  const [earthquake, setEarthquake] = useState({})
  const [comments, setComments] = useState([])
  const base = import.meta.env.VITE_API_BASE

  useEffect(() => {
    fetch(`${base}/comments?earthquake_id=${id}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error fetching comments:', error))
    fetch(`${base}/earthquakes/${id}`)
      .then((response) => response.json())
      .then((data) => setEarthquake(data))
      .catch((error) => console.error('Error fetching earthquake:', error))
  }, [])

  console.log(comments)
  console.log(earthquake)
  
  const storedUserData = JSON.parse(localStorage.getItem('userData'))

  const handleSubmitAction = async (data) => {
    const values = {
      earthquake_id: id,
      body: data.text,
      user_id: data.userId,
      user_fullname: data.fullName
    }
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
      const response = await request({url: '/comments.json', ...options})
      console.log('***RESPONSE***')
      console.log(response)
      if (!response?.token) {
        return { [FORM_ERROR]: response.error}
      }
    } catch (error) {
      return { [FORM_ERROR]: `Ocurrió un error: ${error}` }
    }
  }
  const handleReplyAction = (data) => {
    console.log(data)
  }
  return (
    <div>
      <div className="block md:flex">
      {Object.keys(earthquake).length > 0 && (
        <CardInfo
          title={earthquake.attributes.title}
          infoText={`
            Magnitude: ${earthquake.attributes.magnitude}<br>
            Type: ${earthquake.attributes.mag_type}<br>
            Date: ${earthquake.attributes.time}<br>
            Tsunami: ${earthquake.attributes.tsunami === 1? 'Si': 'No'}<br>
            Longitude: ${earthquake.attributes.coordinates.longitude}<br>
            Latitude: ${earthquake.attributes.coordinates.latitude}<br>
            Link: <a class="text-blue-600" href="${earthquake.links.external_url}/executive" rel="noopener noreferrer" target='_blank'>${earthquake.links.external_url}</a>
          `}
          cardClassName="md:mr-5 mb-5 md:mb-0 max-w-xl"
          renderHtml
        />
      )}
      {Object.keys(earthquake).length > 0 && (
        <>
          <PreviewLink url={`${earthquake.links.external_url}/map`} name="See map in USGS" />
        </>
      )}
      </div>
      <CommentSection
        currentUser={{
          currentUserId: storedUserData.id,
          currentUserImg:
            `https://ui-avatars.com/api/name=${storedUserData.name}&background=random`,
          currentUserFullName: storedUserData.name
        }}
        advancedInput={false}
        hrStyle={{ border: "0.5px solid #ff0072" }}
        commentData={comments}
        inputStyle={{ border: "1px solid rgb(208 208 208)" }}
        submitBtnStyle={{
          border: "1px solid black",
          backgroundColor: "black",
          padding: "7px 15px"
        }}
        cancelBtnStyle={{
          border: "1px solid gray",
          backgroundColor: "gray",
          color: "white",
          padding: "7px 15px"
        }}
        replyInputStyle={{ borderBottom: "1px solid black", color: "black" }}
        onSubmitAction={(data) => handleSubmitAction(data)}
        onReplyAction={(data) =>  handleReplyAction(data)}
      />
    </div>
  )
}