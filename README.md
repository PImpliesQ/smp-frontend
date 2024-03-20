# How to run

## Clone the repository
```bash
git clone https://github.com/PImpliesQ/smp-frontend.git
```

## Build with Docker
```bash
docker build -t smp-frontend .
```

## Run the container
```bash
docker run -p 3000:3000 smp-frontend
```

# Team Member Contributions
- The final code for this repo was mostly written by Will Favier-Parsons, the CI/CD pipeline (including the Dockerfile),
deployment and hosting with docker-compose and nginx, the auth setup with Clerk, the OpenAI integration, and some of the UI design.
- The UI design was mostly handled by Morgan James and Callum Hynes.
- The initial code and various prototypes were made by Morgan James, Adam Okeahalam, and Kaylum Smith.
- The original leaderboard prototype was written by Morgan James and Hector Gittos.
- Integration and validation testing was done by Will Favier-Parsons, Kaylum Smith, and Adam Okeahalam.
- The initial MVP was designed by Morgan James, Callum Hynes, and Will Favier-Parsons.
