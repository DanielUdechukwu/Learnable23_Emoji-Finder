import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Rings } from "react-loader-spinner";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [fetchedEmojis, setFetchedEmojis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetches a list of emojis on mount
  const getEmojis = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/emojis?access_key=94430dacffb5291094271266dc6b5f245e51be11`
      );
      if (response.status === 200) {
        const fetchedEmojis = response.data.map((emoji) => emoji.character);
        setFetchedEmojis(fetchedEmojis);
        setIsLoading(false);
      }
      console.log(response);
      // console.log(fetchedEmojis);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmojis();
  }, []);

  // Ends...

  // Gets User input onChange
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Gets emojis from searched value, passed to the endpoint to search for relevant emojis, all onClick of the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    setEndPoint(userInput);

    const getSearchedEmoji = async () => {
      try {
        const response = await axios.get(
          `/emojis?search=${userInput}&access_key=94430dacffb5291094271266dc6b5f245e51be11`
        );
        console.log(response.data);
        if (response.status === 200) {
          const emojis = response.data.map((emoji) => emoji.character);
          setFetchedEmojis(emojis);
          setIsLoading(false);
        }
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSearchedEmoji();
    console.log(fetchedEmojis);
  };

  return (
    <div className="min-h-screen relative bg-red-900">
      <div className="flex justify-center items-center h-[4rem]">
        <p className="text-[1.6rem] lg:text-[3rem] font-medium text-[#e7decc]">
          Emoji Finder
        </p>
      </div>
      <div className="w-[90%] mx-auto">
        {isLoading ? (
          <div className="h-full flex justify-center items-center">
            <Rings
              visible={true}
              height="130"
              width="130"
              color="#fafafa"
              ariaLabel="rings-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 lg:grid-cols-10">
            {fetchedEmojis.slice(0, 150).map((item, index) => {
              return (
                <p
                  className="text-[3rem] flex justify-center lg:text-[4rem]"
                  key={index}
                >
                  {item}
                </p>
              );
            })}
          </div>
        )}
      </div>
      <form className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] fixed left-1/2 transform -translate-x-1/2 bottom-[2rem]">
        <div className="flex flex-col">
          <input
            className="outline-none border-none px-2 py-2 rounded-sm text-[1rem] font-medium placeholder:font-medium bg-[#e7decc]"
            placeholder="Search Emoji"
            type="text"
            value={userInput}
            onChange={handleInputChange}
          />
          <div className="flex justify-center items-center my-3">
            <button
              className="bg-blue-500 w-[40%] max-[500px]:w-full md:w-[20%] py-2 rounded-sm text-[.9rem]"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
