# Visualforce to LWC

[![Github Workflow](<https://github.com/trailheadapps/visualforce-to-lwc/workflows/Salesforce%20DX%20(scratch%20org)/badge.svg?branch=master>)](https://github.com/trailheadapps/visualforce-to-lwc/actions?query=workflow%3A%22Salesforce+DX+%28scratch+org%29%22) [![codecov](https://codecov.io/gh/trailheadapps/visualforce-to-lwc/branch/master/graph/badge.svg)](https://codecov.io/gh/trailheadapps/visualforce-to-lwc)

![Visualforce to LWC logo](vf-to-lwc-logo.png)

A collection of code examples to help you move from Visualforce to LWC. Each example shows a typical Visualforce pattern and its equivalent implementation in LWC. On each example, there's a link that takes you right to the Visualforce or LWC code in GitHub. Heavy usage of base components and features as Lightning Data Service.

<div>
    <img src="https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70,w_50/learn/projects/quick-start-explore-the-visualforce-to-lwc-sample-app/9e3d54bf2af4e57a3581ed6c2386b473_badge.png" align="left" alt="Trailhead Badge"/>
    Learn more about this app by completing the <a href="https://trailhead.salesforce.com/en/content/learn/projects/quick-start-explore-the-visualforce-to-lwc-sample-app">Quick Start: Explore the Visualforce to LWC Sample App</a> Trailhead project.
    <br/>
    <br/>
    <br/>
</div>

## Table of contents

-   [Installing Visualforce to LWC Using a Scratch Org](#installing-the-app-using-a-scratch-org): This is the recommended installation option. Use this option if you are a developer who wants to experience the app and the code.

-   [Installing Visualforce to LWC Using an Unlocked Package](#installing-the-app-using-an-unlocked-package): This option allows anybody to experience the sample app without installing a local development environment.

-   [Installing Visualforce to LWC using a Developer Edition Org or a Trailhead Playground](#installing-the-app-using-a-developer-edition-org-or-a-trailhead-playground): Useful when tackling Trailhead Badges or if you want the app deployed to a more permanent environment than a Scratch org.

-   [Optional installation instructions](#optional-installation-instructions)

## Installing the app using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

    - Enable Dev Hub in your Trailhead Playground
    - Install Salesforce CLI
    - Install Visual Studio Code
    - Install the Visual Studio Code Salesforce extensions

1. If you haven't already done so, authorize with your hub org and provide it with an alias (**myhuborg** in the command below):

    ```
    sfdx force:auth:web:login -d -a myhuborg
    ```

1. Clone the visualforce-to-lwc repository:

    ```
    git clone https://github.com/trailheadapps/visualforce-to-lwc
    cd visualforce-to-lwc
    ```

1. Create a scratch org and provide it with an alias (**visualforce-to-lwc** in the command below):

    ```
    sfdx force:org:create -s -f config/project-scratch-def.json -a visualforce-to-lwc
    ```

1. Push the app to your scratch org:

    ```
    sfdx force:source:push
    ```

1. Assign the **Visualforce_to_LWC** permission set to the default user:

    ```
    sfdx force:user:permset:assign -n Visualforce_to_LWC
    ```

1. Import sample data:

    ```
    sfdx force:data:tree:import -p ./data/sample-data-plan.json
    ```

1. Open the scratch org:

    ```
    sfdx force:org:open
    ```

1. In **Setup**, under **Themes and Branding**, activate the **Visualforce to LWC** theme.

1. In App Launcher, click View all then select the **Visualforce to LWC** app.

## Installing the app using an Unlocked Package

Follow this set of instructions if you want to deploy the app to a more permanent environment than a Scratch org or if you don't want to install the local developement tools. You can use a non source-tracked orgs such as a free [Developer Edition Org](https://developer.salesforce.com/signup) or a [Trailhead Playground](https://trailhead.salesforce.com/).

Make sure to start from a brand-new environment to avoid conflicts with previous work you may have done.

1. Log in to your org

1. If you are setting up a Developer Edition: go to **Setup**, under **My Domain**, [register a My Domain](https://help.salesforce.com/articleView?id=domain_name_setup.htm&type=5).

1. Click [this link](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3h000004jkY3AAI) to install the Visualforce to LWC unlocked package in your org.

1. Select **Install for All Users**

1. Import Account and Contacts data:

    - Click [here](https://raw.githubusercontent.com/trailheadapps/visualforce-to-lwc/master/data/Accounts-Contacts.csv) to acccess the **Accounts-Contacts.csv** file. Right click in the browser window and save the file as **Accounts-Contacts.csv**.
    - In **Setup**, type **Data Import** in the Quick Find box and click **Data Import Wizard**.
    - Click **Launch Wizard**.
    - Click **Accounts and Contacts**, and click **Add New Records**.
    - Select **Match Account by: Name & Site**.
    - Drag the **Accounts-Contacts.csv** file you just saved to the upload area.
    - Click **Next**, **Next**, and **Start Import**.

1. If you're attempting the [Quick Start](https://trailhead.salesforce.com/en/content/learn/projects/quick-start-visualforce-to-lwc-sample-app) on Trailhead, this step is required, but otherwise, skip:

    - Go to **Setup > Users > Permission Sets**.
    - Click **Visualforce_to_LWC**.
    - Click **Manage Assignments**.
    - Check your user and click **Add Assignments**.

1. In **Setup**, under **Themes and Branding**, activate the **Visualforce to LWC** theme.

1. In App Launcher, click View all then select the **LWC** app.

## Installing the App using a Developer Edition Org or a Trailhead Playground

Follow this set of instructions if you want to deploy the app to a more permanent environment than a Scratch org.
This includes non source-tracked orgs such as a [free Developer Edition Org](https://developer.salesforce.com/signup) or a [Trailhead Playground](https://trailhead.salesforce.com/).

Make sure to start from a brand-new environment to avoid conflicts with previous work you may have done.

1. Clone this repository:

    ```
    git clone https://github.com/trailheadapps/visualforce-to-lwc
    cd visualforce-to-lwc
    ```

1. Authorize with your Trailhead Playground or Developer org and provide it with an alias (**mydevorg** in the command below):

    ```
    sfdx force:auth:web:login -s -a mydevorg
    ```

1. If you are setting up a Developer Edition: go to **Setup**, under **My Domain**, [register a My Domain](https://help.salesforce.com/articleView?id=domain_name_setup.htm&type=5).

1. Run this command in a terminal to deploy the app.

    ```
    sfdx force:source:deploy -p force-app
    ```

1. Assign the `Visualforce_to_LWC` permission set to the default user.

    ```
    sfdx force:user:permset:assign -n Visualforce_to_LWC
    ```

1. Import some sample data.

    ```
    sfdx force:data:tree:import -p ./data/sample-data-plan.json
    ```

1. If your org isn't already open, open it now:

    ```
    sfdx force:org:open -u mydevorg
    ```

1. In **Setup**, under **Themes and Branding**, activate the **Visualforce to LWC** theme.

1. In App Launcher, select the **Visualforce to LWC** app.

## Optional Installation Instructions

This repository contains several files that are relevant if you want to integrate modern web development tooling to your Salesforce development processes, or to your continuous integration/continuous deployment processes.

### Code formatting

[Prettier](https://prettier.io/) is a code formatter used to ensure consistent formatting across your code base. To use Prettier with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) from the Visual Studio Code Marketplace. The [.prettierignore](/.prettierignore) and [.prettierrc](/.prettierrc) files are provided as part of this repository to control the behavior of the Prettier formatter.

### Code linting

[ESLint](https://eslint.org/) is a popular JavaScript linting tool used to identify stylistic errors and erroneous constructs. To use ESLint with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-lwc) from the Visual Studio Code Marketplace. The [.eslintignore](/.eslintignore) file is provided as part of this repository to exclude specific files from the linting process in the context of Lighning Web Components development.

### Pre-commit hook

This repository also comes with a [package.json](./package.json) file that makes it easy to set up a pre-commit hook that enforces code formatting and linting by running Prettier and ESLint every time you `git commit` changes.

To set up the formatting and linting pre-commit hook:

1. Install [Node.js](https://nodejs.org) if you haven't already done so
1. Run `npm install` in your project's root folder to install the ESLint and Prettier modules (Note: Mac users should verify that Xcode command line tools are installed before running this command.)

> Note: This projects also contains [Jest](https://jestjs.io) tests for unit testing Lightning Web Components. If you experience errors regarding `deasync` when running `npm install` please check out the troubleshooting information in the [lwc-jest repository](https://github.com/salesforce/lwc-jest#troubleshooting-deasync-installation-errors).

Prettier and ESLint will now run automatically every time you commit changes. The commit will fail if linting errors are detected. You can also run the formatting and linting from the command line using the following commands (check out [package.json](./package.json) for the full list):

```
npm run lint:lwc
npm run prettier
```
