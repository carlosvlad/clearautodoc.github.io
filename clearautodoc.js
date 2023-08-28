var Dbuf = "";
D = (c)=> { 
	Dbuf += c.split("\n").map(line => line.trim()).join("\n"); console.log(Dbuf) 
	};
DIMG = async()=> { 
	var canvas = await html2canvas(document.querySelector("#content"));
	Dbuf += " " + canvas.toDataURL('image/jpg', 0.5) + "\n"; console.log(Dbuf);
};
DIMG2 = async()=> { {
  const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
  const vid = document.createElement("video");
  vid.addEventListener( "loadedmetadata", function () {
    const canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");
    ctx.canvas.width = vid.videoWidth;
    ctx.canvas.height = vid.videoHeight;
    ctx.drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);
    stream.getVideoTracks()[0].stop();
	Dbuf += " " + canvas.toDataURL("image/jpeg", 0.5); console.log(Dbuf);
  } );
  vid.srcObject = stream;
  vid.play();
}
window.addEventListener("click", (e)=> {
	switch (e.target.nodeName) {
		case 'INPUT': var elem = e.target.parentNode; 
			while (elem != null && elem.tagName != "LABEL") elem = elem.previousSibling;
			if (elem.innerHTML.includes("checkbox")) D(`\nROL->APP: [chk] ${elem.textContent.trim()}\n`);
			else D(`\nROL->APP: [key] ${elem.textContent.trim()}\n`);
			break;
		case 'BUTTON': D(`\nROL->APP: [btn] ${e.target.textContent.trim()}\n`); 
			break;
		case 'A': D(`\nROL->APP: [lnk] ${e.target.innerHTML.trim()}\n`); 
	} 
});