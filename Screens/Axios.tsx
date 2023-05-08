import React, { useState } from "react";
import { View, Image, Button } from "react-native";

import {
  RemoveBgResult,
  RemoveBgError,
  removeBackgroundFromImageFile,
} from "remove.bg";

const localFile = "./local/file/name.jpg";
const outputFile = `${__dirname}/out/img-removed-from-file.png`;

removeBackgroundFromImageFile({
  path: localFile,
  apiKey: "YOUR-API-KEY",
  size: "regular",
  type: "auto",
  scale: "50%",
  outputFile,
})
  .then((result: RemoveBgResult) => {
    console.log(`File saved to ${outputFile}`);
    const base64img = result.base64img;
  })
  .catch((errors: Array<RemoveBgError>) => {
    console.log(JSON.stringify(errors));
  });

// const BackgroundRemoverScreen = () => {
//   const [resultImageURI, setResultImageURI] = useState<string | null>(null);

//   const handleRemoveBackground = async () => {
//     try {
//       const respnse = await fetch("../components/guy.jpg");

//       const blob = await respnse.blob();
//       // Replace 'YOUR_API_KEY' with your actual API key
//       const apiKey = "xyP9ShhYFswnSU5A4ccZWvuF";
//       const apiUrl = "https://api.remove.bg/v1.0/removebg";

//       const formData = new FormData();
//       formData.append("image_file", {
//         uri: "", // Replace with your actual image URI
//         type: "image/jpeg",
//         name: "image.jpg",
//       });

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "X-Api-Key": apiKey,
//         },
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setResultImageURI(result.data.result_url);
//       } else {
//         console.error("Error:", result.errors);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <View>
//       {resultImageURI && (
//         <Image
//           source={{ uri: resultImageURI }}
//           style={{ width: 300, height: 300 }}
//         />
//       )}
//       <Button title="Remove Background" onPress={handleRemoveBackground} />
//     </View>
//   );
// };

// export default BackgroundRemoverScreen;
