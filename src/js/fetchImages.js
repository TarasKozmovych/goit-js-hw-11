import axios from 'axios';
import Notiflix from 'notiflix';

const url = `https://pixabay.com/api/
?key=29665517-503a19893477763dfc63054fb
&image_type=photo
&orientation=horizontal
&safesearch=true
`;

async function fetchImages(imageQuery, pageNumber) {
    const result = await axios.get(
        `${url}&q=${imageQuery}&per_page=40&page=${pageNumber}`
    );

    if (result.status === 200 && result.data.totalHits === 0) {
        Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    }

    return result;
}

export default fetchImages;