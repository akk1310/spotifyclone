console.log("Let us write JS")
let currentSong=new Audio();
let songs;
let currFolder;

function secondsToMinutesAndSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Adding leading zeros if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// Example usage:
// const totalSeconds = 125;
// const formattedTime = secondsToMinutesAndSeconds(totalSeconds);
// console.log(formattedTime);  // Output: "02:05"


async function getSongs(folder){
    currFolder=folder

    
    let a = await fetch(`/${folder}/`)
    let response = await a.text();
    // console.log(response)
    let div=document.createElement("div")
    div.innerHTML=response;
    let as = div.getElementsByTagName("a")
    songs=[]
    console.log(songs)
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1])
        }
        
    }

    


    //shows all the songs in playlist
    
    let songUL=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML=" "
    for (const song of songs) {
        songUL.innerHTML=songUL.innerHTML+`<li> 
        <img class="songlogo" src=${"https://i.scdn.co/image/ab67706f000000026e515187c071e45918e9f0de"} alt="music">
        <div class="info">
            <div>${song.replaceAll("%20"," ").split("-")[0]}</div>
            <div class="songartist">${song.replaceAll("%20"," ").split("-")[1]}</div>
        </div>
        <img class="listplay" src="img/play2.svg" alt="play now">
    </li>`;
        
    }
    
    //play 1st song
    // var audio = new Audio(songs[1]);
    // audio.play();
    
    // audio.addEventListener("loadeddata",()=>{
        // let duration = audio.duration;  
        // console.log(audio.duration,audio.currentSrc,audio.currentTime) 
         
    // });

    //attach an event listner to each song
    let i=document.querySelector(".songlist").getElementsByTagName("li");

    Array.from(i).forEach(e=>{
        e.addEventListener("click",element=>{
            // console.log(e.getElementsByTagName("div")[0].firstElementChild.innerHTML)
            // console.log(e.getElementsByTagName("div")[0].lastElementChild.innerHTML)

            playMusic(e.getElementsByTagName("div")[0].firstElementChild.innerHTML.trim()+"-"+e.getElementsByTagName("div")[0].lastElementChild.innerHTML.trim())

        })
    })
    //next btn
    // document.querySelector(".next").addEventListener("click",()=>{
    //     console.log("next")
    //     console.log(currentSong.src)
    //     console.log(currFolder)
    //     console.log(currentSong.src.split(`/${currFolder}/`).slice(-1)[0])

    //     let index=indexOf(currentSong.src.split(`/${currFolder}/`).slice(-1)[0])
    //     console.log(index)
    //     // console.log(currentSong.src.split("/Songs/").slice(-1)[0])
    //     // console.log(songs,index)

    //     if((index+1) < songs.length){
    //         playMusic(songs[index+1])
    //     }
        


    // })
    

    return songs;
}

const playMusic = (track, pause=false)=>{
    // let audio = new Audio("/Songs/"+track)
    currentSong.src = `/${currFolder}/`+track
    if(!pause){
        
        currentSong.play()
        play.src="img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML=decodeURI(track);
    document.querySelector(".songtime").innerHTML="00:00/03:48";

    
    

}
async function displayAlbums(){
    let a = await fetch(`/songs/`)
    let response = await a.text();
    // console.log(response)
    let div=document.createElement("div")
    div.innerHTML=response;
    let anchors=div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    
    let array=Array.from(anchors)
        for (let index = 0; index < array.length; index++) {
            const e = array[index];
            
        
        if(e.href.includes("/songs") && !e.href.includes(".htaccess")){
            let folder=e.href.split("/").slice(-2)[0]
            // console.log(e.href.split("/").slice(-2)[0])
            //get the metadata of the folder
            let a = await fetch(`/songs/${folder}/info.json`)
            let response = await a.json();
            console.log(response);
            cardContainer.innerHTML=cardContainer.innerHTML + `<div data-folder="${folder}" class="card rounded">
            <div class="play">
                <svg xmlns="http://www.w3.org/2000/svg"  data-encore-id="icon" role="img" width="25" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
            </div>
            <img class="thumbnail" src="/songs/${folder}/cover.jpg" alt="thumbnail">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div>`;


        }
    }
    //load the playlist when card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click",async item=>{
            // console.log(item.target,item.currentTarget.dataset)
            songs=await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
        })
    })
    // //prev btn
    // document.querySelector(".previous").addEventListener("click",()=>{
    //     // console.log("prev")
    //     // console.log(currentSong.src)
    //     let index=songs.indexOf(currentSong.src.split(`/${currFolder}/`).slice(-1) [0])
    //     if((index-1)>= 0){
    //         playMusic(songs[index-1])
    //     }
        
    // })
     //load the playlist when card is clicked
    //  Array.from(document.getElementsByClassName("card")).forEach(e=>{
    //     e.addEventListener("click",async item=>{
    //         // console.log(item.target,item.currentTarget.dataset)
    //         songs=await getSongs(`songs/${item.currentTarget.dataset.folder}`)
    //     })
    // })



    // //next btn
    // document.querySelector(".next").addEventListener("click",()=>{
    //     console.log("next")
    //     console.log(currentSong.src)
    //     console.log(currFolder)
    //     console.log(currentSong.src.split(`/${currFolder}/`).slice(-1)[0])
    //     console.log(songs)
    //     let index=songs.indexOf(currentSong.src.split(`/${currFolder}/`).slice(-1)[0])
    //     console.log(index)
    //     // console.log(currentSong.src.split("/Songs/").slice(-1)[0])
    //     // console.log(songs,index)

    //     if((index+1) < songs.length){
    //         playMusic(songs[index+1])
    //     }
        


    // })


    

}

async function main(){

    

    //get the list of all songs
    await getSongs("songs/Party")
    
    // console.log(songs)
    playMusic(songs[0], true)

    //display all albums on the page
    await displayAlbums()
    
   


    //attach an event listner to play prev. and next song
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src="img/pause.svg"
        }
        else{
            currentSong.pause()
            play.src="img/play.svg"
        }
    })

    //listen for time update song
    currentSong.addEventListener("timeupdate",()=>{
        // console.log(currentSong.currentTime,currentSong.duration)
        document.querySelector(".songtime").innerHTML=`
        ${secondsToMinutesAndSeconds(currentSong.currentTime)}/${secondsToMinutesAndSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";
    })

    //seekbar eventlist
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left=percent+"%";
        currentSong.currentTime=(currentSong.duration * percent)/100;
    })

    //hamburger eventlistner
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = 0;
    })

    //close eventlistner
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-100%";
    })

    //prev btn
    document.querySelector(".previous").addEventListener("click",()=>{
        // console.log("prev")
        // console.log(currentSong.src)
        let index=songs.indexOf(currentSong.src.split(`/${currFolder}/`).slice(-1) [0])
        if((index-1)>= 0){
            playMusic(songs[index-1])
        }
        
    })
    //  //load the playlist when card is clicked
    // //  Array.from(document.getElementsByClassName("card")).forEach(e=>{
    // //     e.addEventListener("click",async item=>{
    // //         // console.log(item.target,item.currentTarget.dataset)
    // //         songs=await getSongs(`songs/${item.currentTarget.dataset.folder}`)
    // //     })
    // // })



    //next btn
    document.querySelector(".next").addEventListener("click",()=>{
        // console.log("next")
        let index=songs.indexOf(currentSong.src.split(`/${currFolder}/`).slice(-1) [0])

        // console.log(currentSong.src.split("/Songs/").slice(-1)[0])
        // console.log(songs,index)

        if((index+1) < songs.length){
            playMusic(songs[index+1])
        }
        


    })

    //vol btn
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        // console.log(e.target.value)
        currentSong.volume = parseInt(e.target.value)/100
        // if (currentSong.volume=0){
        //     document.querySelector(".volume>img").target.src=document.querySelector(".volume>img").target.src.replace("volume.svg","mute.svg")

        // }

    })

    //load the playlist when card is clicked
    // Array.from(document.getElementsByClassName("card")).forEach(e=>{
    //     e.addEventListener("click",async item=>{
    //         // console.log(item.target,item.currentTarget.dataset)
    //         songs=await getSongs(`songs/${item.currentTarget.dataset.folder}`)
    //     })
    // })

    //add event listner to mute volume
    document.querySelector(".volume>img").addEventListener("click",e=>{
        // console.log(e.target)
        if(e.target.src.includes("volume.svg")){
            e.target.src=e.target.src.replace("volume.svg","mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0
        }
        else{
            e.target.src=e.target.src.replace("mute.svg","volume.svg")
            document.querySelector(".range").getElementsByTagName("input")[0].value=20

            currentSong.volume = 0.2;

        }
    })


}
main() 



