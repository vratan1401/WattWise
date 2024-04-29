Cloning the Repo
To first clone repo, open terminal and run:
git clone https://github.com/Wurmple/WattWise
This should create WattWise project directory. Open it in VS Code.

Running the App
Open a terminal in WattWise directory. To first install neccesary python packages and activate virtual environment run:
pipenv install
pipenv shell
Open another terminal in WattWise directory. To first install neccesary npm packages run and start app run:
cd .\frontend\
npm install
npm start

RUN ALL GIT COMMANDS AT PROJECT ROOT DIRECTORY
Creating New Branch
By default after cloning you can work on the master branch, but DONT make changes to master branch
To create a new branch open a new terminal and run:
git checkout -b branch-name

Staging, Commiting and Pushing Changes
Make whatever changes you want to make now
To stage those changes run:
git add .
To commit those changes run:
git commit -m "describe your commit nicely here"
Ignore any warnings for now saying file size is large. This commits the changes made to your local repository. To now push the changes to a remote (online github) repository run:
git push origin branch-name

Creating a Pull Request (PR)
Go to github website repo and create a new PR for the newly pushed branch. Wait for the PR to be merged into the master branch

Testing Pushed Branch
To test the newly pushed PR branch run:
git fetch origin pull/{PR_NUMBER}/head:branch-name
git checkout branch-name

Pulling Changes from Master Branch
To update the local repo to current master branch code run:
git checkout master
git pull origin master
This should get you the most recent state of the project on your computer
