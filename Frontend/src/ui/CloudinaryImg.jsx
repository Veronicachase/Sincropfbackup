import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";


export default function Img({ uploadedImg, className, props }) {
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dcmnj8rrj",
		},
	});


	const myImage = cld.image(uploadedImg);

	return (
		<>
			<AdvancedImage
                {...props}
                style={{ maxWidth: "100px", margin: "5px" }}
				className={className}
				cldImg={myImage}
				plugins={[lazyload(), placeholder({ mode: "blur" })]}
			/>
		</>
	);
}
