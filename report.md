# Introduction ✨

## What are you building?
* An app to remind users to take their medication, that encourages users to meet their medication goals and take their medication consistently.

## Why are you building it?
* To have a positive impact on people's health, automate their current solution and prevent them missing medication from a changed routine.

## Project scope 
### What are you not building?
* Not building a full health with other things such as appointments, therapy, surgergy etc.
### How did you decide what features were important?
* We focused just on what was needed to remind the users about their medications.
* Feedback from our user testing decided which features were essential to include.
* In our design sprint we prioritised our ideas with Miro.

## Project plan 
### How are you going to structure your sprints?
* Focus on core user stories and break them down into issues. 
* Use actual and estimate to calculate velocity.
* 2 build sprints with a review at the end of build 1.
* Assigning role to each team member.
### What order are you going to build in?
* Front end first, authenication and then features.
* Feature prioritisation: add/delete medicines, heatmap/record tracker, in app notifications, external notifications, reminder of how much medicine is left, reward garden. 
### How did user research inform your plan?
* We did user research to understand what they would want from an app using open questions. We then built a prototype based on this information and went back to the users to get their thoughts on the prototype. Following this we altered the prototype to suit the needs of the users.

## Requirement analysis 
### How will you ensure your project is accessible to as many users as possible?
* Create an issue on accessibility to remind us to review before the end of the project. 
* Run lighthouse report.
* Navigate the app by keyboard only.

### Are there any legal or regulatory requirements you should consider?
* GDPR - dealing with personal data.

## Project learnings 
### Did your team work effectively?
Yes, worked well in pairs. 
We had good file structure which helped us naviagte well around the app.
Good time management.
### Learnings
* More comfortable using next.js using server-side props and api routes.
* New technology - twilio, cron, github actions, send grid.
* Styled components.
* SQL queries.

### What would you do differently next time?
* More research into heatmap, maybe install package to see how it works and how it can interact with our data.
* Re-look into populate record bug.
* Share out styling.

## Research and findings 
### What did you find out from user testing?
* Streak was favoured in the user research, users liked to be able to track their progress and see which days they had missed.
* Verified the navigagtion of our pages, "everything was 2 clicks away".
* All users wanted an option to reschedule a notification if the current time was not convenient. 
* Liked the colour scheme.
* Wanted some level of security and privacy.

## Project outcomes 
### Were your assumptions right or wrong?
Wrong, over estimated the amout we could build in the time.

## Recommendations and conclusions 
### What features would you prioritise to build next?
* Heatmap.
* Rewards.

### Was the project a success?
* Yes! Has core functionality with some nifty features.

## Software Development Lifecycle stages 
### Planning 
What roles did your team take on?
Scrum - Adam - project board, stand-ups, tracking team progress.
DevOps - Juliette - project set up, github actions?
QA - Oli - testing, cypress, cleaning up the code, remove console log, appropriately named variables.
UX/UI - Miah - styling, design, accessibility.

### Did these roles help your team work effectively?
* Yes, allowed us to focus on an area of the application but we also worked in pairs on certain features.

## Analysis 
### What might be the intended and unintended consequences of building this product?
* Missed/Double medication if issue with notification.

## Design 
### How did you plan a user experience?
* Did user research and testing, we tried to refine the product to meet the needs of the user.
### What technical decisions did you make?
* After the first sprint we decided to not do the rewards system as this did not seem feasible in the time frame.
* We decided to use next.js as we wanted to use react on the front end but also required the use of a database.
* We used PSQL db hosted on elephant SQL, we ran into issues as the site would crash if visited by too many users at one time, therefore with advice we switched to supabase.
* Hosted on vercel as used next.js.
* We started with front end to begin with and later integrated db input from the user.

## Implementation/Build 
### How did you ensure your code was good?
* Used cypress testing to find errors in authenication.
* Code reading.
* QA monitoring appropriate naming/removal of console.logs.
* Used some middleware functions to prevent duplication.
### Create logical and maintainable code to deliver project outcomes, explaining their choice of approach.
* Used next JS and wanted to use react and also wanted to encorporate a db, also this allowed us to use vercel as this allows to view pre-deployment to catch error before pushing to main.

What interesting technical problems did you have to solve?

Outline and apply the rationale and use of algorithms, logic and data structures. (K9, S16)

How did you debug issues that arose?
Apply structured techniques to problem solving to identify and resolve issues and debug basic flaws in code (S7)

## Test 
How did you verify your project worked correctly?
Identify and create test scenarios which satisfy the project specification (S6)

Did writing automated tests catch any bugs?
Analyse unit testing results and review the outcomes, correcting errors. (S4)

## Deploy 
* Vercel - given as using next.js.
* Able to review pre-deployments before pushing to main. 
#### What problems did you encounter during deployment?
* Multiple vercel accounts linking to the same repo and this caused confusion in the deployment environments. 
* Also we had issues were our environment varibale were deleted from vercel, we learnt that if any issues best to check you have all the up to date ones first.

Maintain 
Is it easy for someone make changes to the codebase?
Could a new person quickly be onboarded to contribute?
