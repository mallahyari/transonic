# Moments to Tweets

This is a fun app that let you turn your thoughts into tweets in a jiffy!

You simply talk to the mic and it records your voice, transcribes it and turn it into a tweet with a click of a button. You can run the ASR Whisper models either locally or via OpenAI API. By default it's using the API, but if you'd like to use the models locally, check `audio_service_local.py` file. There are two different approaches to run the model locally using two different python libraries: `fast-whisper` and `insanely-fast-whisper`. Pick whichever that suits you or faster on your system, and update the FastAPI endpoint/path accordingly.




https://github.com/mallahyari/transonic/assets/28068313/1523e65b-b266-4ac5-a576-c32e7483583a




## Quick Start

1. Clone the repo:

```bash
git clone https://github.com/mallahyari/transonic.git
```

2. To run the frontend, go to the `frontend` directory and run:

```bash
npm install
npm start
```

You can skip the authentication if you run it locally. Nevertheless, if you would like to set up _authentication_, you'll need to add your `CLERK_PUBLISHABLE_KEY` to your `.env` file in `frontend` folder.

Additionally, if you tend to run FastAPI backend locally, make sure to update the `BACKEND_URL` inside the `frontend/src/config.ts` to the appropriate url, e.g. `http://localhost:8000`.

3. To run the backend, from `backend/app` folder run:

```bash
pip install -r requirements.txt
python main.py
```

If you plan to use OpenAI Whisper API, you will need to enter your `OPENAI_API_KEY`. To do that, simply create a `.env` file in the `backend/app` directory with the following info:

```bash
OPENAI_API_KEY=
```

## Tech Stack

### Frontend

- App logic: React + [ant design](https://ant.design/)
- Authentication: [Clerk](https://clerk.com/)
- Deployment: [Vercel](https://vercel.com/)

### Backend

- App logic: FastAPI
- Deployment: [Fly.io](https://fly.io/)

## Discussion and Contribution

If you have any comment or feedback, please don't hesitate to reach out directly or use the Discussions section and open a new topic. You can also reach out directly via [Linkedin](https://www.linkedin.com/in/mehdiallahyari/) or [Twitter](https://twitter.com/MehdiAllahyari).
