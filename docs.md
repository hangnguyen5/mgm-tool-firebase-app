# CoE Management Tools (GCP)

# Requirements

#### <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">1. Overview</span></span>

<div class="SCXW14938372 BCX8" id="bkmrk-using-gcp-for-manage"><div class="ListContainerWrapper SCXW14938372 BCX8">- <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Building a serverless web application on the Google Cloud Platform (GCP) to provide comprehensive insights into the utilization and skills of the CoE members.</span></span>
- <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">The platform will automate the processing and analysis of member and utilization data, delivering actionable intelligence to resource managers</span></span>
- The serverless application is made of GCP services including Cloud Storage, Cloud Functions, <span class="NormalTextRun SCXW14938372 BCX8">Firestore</span><span class="NormalTextRun SCXW14938372 BCX8">, Cloud </span><span class="NormalTextRun SCXW14938372 BCX8">Scheduler,</span><span class="NormalTextRun SCXW14938372 BCX8"> BigQuery, Firebase and Looker.</span>

</div></div>#### <span class="EOP SCXW14938372 BCX8" data-ccp-props="{}">2. Data Sources </span>

<div class="SCXW14938372 BCX8" id="bkmrk-member-excel-files-c"><div class="ListContainerWrapper SCXW14938372 BCX8">- <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">**CoE Member Profiles:** An Excel files </span><span class="NormalTextRun SCXW14938372 BCX8">containing</span><span class="NormalTextRun SCXW14938372 BCX8"> information for </span><span class="NormalTextRun SCXW14938372 BCX8">CoE</span><span class="NormalTextRun SCXW14938372 BCX8"> members. The data fileds include: LDAP, Oracle ID, Employee Name, Email, Level, Practice, Location, </span><span class="NormalTextRun SCXW14938372 BCX8">CoE</span><span class="NormalTextRun SCXW14938372 BCX8">/Practice, Group, Report Manager, </span><span class="NormalTextRun SCXW14938372 BCX8">Hinext</span><span class="NormalTextRun SCXW14938372 BCX8"> Manager, New </span><span class="NormalTextRun SCXW14938372 BCX8">Hinext</span><span class="NormalTextRun SCXW14938372 BCX8"> Manager</span></span>

</div><div class="ListContainerWrapper SCXW14938372 BCX8">- <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">**Monthly Utilization Reports**: An Excel files containing information on utilization of company employees. This includes the following fields: Name, Level, Start date, Location, BU, Subgroup, CoE/Industry, Billable hours, Time off, Available hours, %Billable, Project Start Date, Project Roll-Off Date, Project Code, Project Name, Project Manager,...</span></span>

</div></div>#### <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">3. Core Requirements:</span></span><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"> </span></span>

<span class="EOP SCXW14938372 BCX8" data-ccp-props="{}">The serverless application will empower resource managers with the following capabilities:</span>

- <span class="EOP SCXW14938372 BCX8" data-ccp-props="{}">Monthly Utilization Insights: Provide a clear overview of the CoE's monthly utilization rates</span>
- Member skill Visibility: Offer a searchable and filterable directory of CoE members and their associated skills and expertise.

##### 3.1. <span class="ng-star-inserted">Interactive Dashboards &amp; Analytics</span>

1. 1. **<span class="ng-star-inserted">CoE Member Directory:</span>**<span class="ng-star-inserted"> A detailed, searchable, and filterable list of all CoE members. This directory will feature dynamic filtering options based on criteria such as skill, level, practice, and location.</span>
    2. <span class="ng-star-inserted">**Group Performance Overview:** A summary view for each group that can be filtered by time period to analyze trends. It will detail:</span>
        1. <span class="ng-star-inserted">Group Name and Leader.</span>
        2. <span class="ng-star-inserted">Total member count.</span>
        3. <span class="ng-star-inserted">Average utilization percentage for the group.</span>
        4. <span class="ng-star-inserted">A count of members with missing timesheets, with the ability to drill down for more detail.</span>
    3. **<span class="ng-star-inserted">Resource Distribution by Level and Business Unit:</span>**<span class="ng-star-inserted"> An interactive chart visualizing the distribution of employee levels across different BUs. This chart will allow managers to apply filters for specific BUs, levels, Location or time periods</span>
    4. **<span class="ng-star-inserted">Resource Allocation Tree Chart:</span>**<span class="ng-star-inserted"> A hierarchical and interactive tree chart that illustrates resource allocation. Users can dynamically filter this view and drill down through the following levels to gain a granular understanding of resource deployment:</span>
        
        
        - **<span class="ng-star-inserted">Practice:</span>**<span class="ng-star-inserted"> The highest level, showing overall resource distribution.</span>
        - **<span class="ng-star-inserted">Industry:</span>**<span class="ng-star-inserted"> The second level, breaking down each practice by the industries they serve.</span>
        - **<span class="ng-star-inserted">Project:</span>**<span class="ng-star-inserted"> The most granular level, showing specific projects and allocated resources.</span>
    5. <span style="color: rgb(22, 145, 121);">**<span class="ng-star-inserted">Member-Centric Project Timeline: </span>**<span class="ng-star-inserted">To provide a detailed, individual-level view of project assignments and future commitments, this interactive chart will display each CoE member along a vertical axis, with a horizontal timeline axis representing weeks and months.</span></span>
        1. <span class="ng-star-inserted" style="color: rgb(22, 145, 121);">For each member, their specific project assignments will be visualized as distinct bars on the timeline.</span>
        2. <span style="color: rgb(22, 145, 121);"><span class="ng-star-inserted">Each bar will represent a single project engagement, clearly marking the individual's </span>**<span class="ng-star-inserted">start date</span>**<span class="ng-star-inserted"> and </span>**<span class="ng-star-inserted">roll-off date</span>**<span class="ng-star-inserted"> for that specific assignment.</span></span>
        3. <span style="color: rgb(22, 145, 121);"><span class="ng-star-inserted">Hovering over or selecting a bar will display key details, including the project name and the member's </span>**<span class="ng-star-inserted">utilization percentage</span>**<span class="ng-star-inserted"> for that period.</span></span>
        4. <span style="color: rgb(22, 145, 121);"><span class="ng-star-inserted">This view is critical for identifying future availability, preventing resource over-allocation, and facilitating precise, long-term staffing plans.</span></span>
    6. <span style="color: rgb(22, 145, 121);">**<span class="ng-star-inserted">Availability and Timesheet Monitoring:</span>**<span class="ng-star-inserted"> These monitoring tools will include powerful filtering options, allowing managers to view data by specific teams, reporting managers, or date ranges to:</span></span>
        
        
        - <span class="ng-star-inserted" style="color: rgb(22, 145, 121);">Quickly identify which team members are available at any given time to be staffed on new projects.</span>
        - <span class="ng-star-inserted" style="color: rgb(22, 145, 121);">Clearly flag individuals who have not submitted their timesheets.</span>
        - <span class="ng-star-inserted" style="color: rgb(22, 145, 121);">Identify the reporting manager for any member with a missing timesheet, with a feature to send automated email reminders to ensure compliance. (TBD)</span>

##### 3.2. Project Intake and Resource Allocation

To facilitate forward-looking resource planning, the application will include form for:

1. **Incoming Project Details**: A form to input information about upcoming projects, including the project's priority, the associated BU and the projected resource utilization percentage.
2. **Key CoE Member Assignment**: A form allowing authorized users to designate or "mark" specific individuals as Key Members of CoE.

##### 3.3. Authentication and Administration

- **<span class="ng-star-inserted">Login/Logout:</span>**<span class="ng-star-inserted"> Secure access will be managed via Google and Username/Password (TBD: Single Sign-On)</span>
- <span style="color: rgb(224, 62, 45);">**<span class="ng-star-inserted">Data Import (Admin Role):</span>**<span class="ng-star-inserted"> A dedicated settings page will allow authorized administrators to upload the two core data source files. This interface will include:</span></span>
    
    
    - <span class="ng-star-inserted" style="color: rgb(224, 62, 45);">Separate uploaders for Member Profiles and Utilization data.</span>
    - <span class="ng-star-inserted" style="color: rgb(224, 62, 45);">Links to download data templates to ensure format consistency.</span>
    - <span class="ng-star-inserted" style="color: rgb(224, 62, 45);">Real-time validation and feedback on file processing (success or detailed error messages).</span>
- <span style="color: rgb(224, 62, 45);">**<span class="ng-star-inserted">Key Member Designation (Admin Role):</span>**<span class="ng-star-inserted"> A management interface to designate specific individuals as "Key Members of the CoE," </span></span>

#### 4. Optional Features (Future Enhancements)  


- **<span class="ng-star-inserted">Skill-Based Candidate Matching:</span>**<span class="ng-star-inserted"> Develop a feature to list and recommend suitable candidates for upcoming projects based on their skills and availability.</span>
- **<span class="ng-star-inserted">Project Manager Feedback Integration:</span>**<span class="ng-star-inserted"> Incorporate a mechanism to gather and analyze feedback from Project Managers on the performance of CoE members.</span>
- **<span class="ng-star-inserted">Certification Management:</span>**<span class="ng-star-inserted"> Provide a view to upload, store, and display member certifications and qualifications as file objects.</span>
- <span class="ng-star-inserted">AI Assistant: An assistant allows user to:</span>
    - <span class="ng-star-inserted">ask complex questions in English (e.g., "Show me all available P3 employees at 2025 Jul 31) </span>
    - <span class="ng-star-inserted">help take actions (e.g., Mark the user "Nguyen Van A" as a key member")</span>

# Architect

<div class="SCXW14938372 BCX8" id="bkmrk-serverless-tools-hel"></div><div class="SCXW14938372 BCX8" id="bkmrk-list-out-candidates-"></div>### <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">1. Designed Architect</span></span>

#### <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">1.1 Core Services: </span></span>

- <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">**Serverless:** architecture leveraging Google Cloud Storage (GCS), Cloud Functions, Firestore, Cloud Scheduler, and BigQuery for a scalable and cost-efficient data pipeline.  
    </span></span>

- **<span class="ng-star-inserted">Presentation Layer:</span>**<span class="ng-star-inserted"> Looker for dashboard rendering, integrated within a custom web application front-end.</span>

[![image.png](http://172.18.25.162:80/uploads/images/gallery/2025-07/scaled-1680-/image.png)](http://172.18.25.162:80/uploads/images/gallery/2025-07/image.png)

<span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"> </span></span>

#### <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Flow: </span></span><span class="EOP SCXW14938372 BCX8" data-ccp-props="{}"> </span>

<div class="SCXW14938372 BCX8" id="bkmrk-%C2%A0uploading-excel-fil"><div class="ListContainerWrapper SCXW14938372 BCX8">1. Uploading Excel files to Management Tool Bucket.
2. Eventarc listen the event, then transfer to Eventarc File Upload Trigger.
3. "Data Adapter" Cloud Functions handle upload data to "Historical Employee Data" Firestore.
4. "Firestore To BQ Topic" send a message to trigger "Data to BigQuery" Cloud Function for reading data from Firestore, Then recording data to Big Query table.
5. Finally, Big Query extract reports to Looker that depends on structured data in Big Query.

</div></div>#### <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Schema:</span></span><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"> </span></span><span class="EOP SCXW14938372 BCX8" data-ccp-props="{}"> </span>

<span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Member JSON Schema data added to FireStore:</span></span><span class="EOP SCXW14938372 BCX8" data-ccp-props="{}"> </span>

<details id="bkmrk-%7B-%22employee%22%3A-%7B-%22ldi"><summary></summary>

```json
{
  "employee": {
    "ldid": "E12345",
    "oracleId": "139273",
    "personal_information": {
      "full_name": "John",
      "email": "john.doe@example.com",
      "start_date": "2023-01-15",
    },
    "status": "ACTIVE",
    "organizational_unit": {
      "bu": "Technology",
      "CoE": "Digital Engineering",
      "location": "HCM",
      "group": "SWAT",
      "sub_group": "TRANS",
      "level": "P2",
      "CoE_swat": false,
      "CoE_sub_leader": {
        "name": "Mike Smith",
        "email: "mike@gmail.com"
      },
      "new_hinext_mgr": {
        "name": "Jane Smith",
        "email: "jan@gmail.com"
      },
      "CoE_leader": {
        "name": "Jane Smith",
        "email: "jane@gmail.com"
      }
    },
    "projects": [
      {
        "project_id": "123",
        "name": "Project Alpha",
        "roll_off_date": "2023-06-30",
        "project_start_date": "2023-06-30",
        "work_logs": [
          {
            "month": "2023-06",
            "work_log_hours": 80,
            "%billable": 100
          },
          {
            "month": "2023-05",
            "work_log_hours": 88,
            "%billable": 90
          }
        ]
      },
      {
        "project_id": "1234",
        "name": "Project Beta",
        "start_date": "2023-07-01",
        "roll_off_date": null,
        "project_start_date": "2023-06-30",
        "work_logs": [
          {
            "month": "2023-07",
            "work_log_hours": 85,
            "%billable": 100
          }
        ]
      }
    ],
    "timesheet_status": [
      {
        "month": "2023-05",
        "status": "done"
      },
      {
        "month": "2023-06",
        "status": "missing"
      }
    ]
  },
  "created_at": "",
  "updated_at": ""
}
```

</details><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Table schema record:</span></span><span class="EOP SCXW14938372 BCX8" data-ccp-props="{}"> </span>

<details id="bkmrk-%5B-%7B%22name%22%3A-%22ldap%22%2C-%22"><summary></summary>

```json
[
  {"name": "ldap", "type": "STRING", "mode": "NULLABLE"},
  {"name": "oracle_id", "type": "STRING", "mode": "NULLABLE"},
  {
    "name": "personal_information",
    "type": "RECORD",
    "mode": "NULLABLE",
    "fields": [
      {"name": "full_name", "type": "STRING", "mode": "NULLABLE"},
      {"name": "email", "type": "STRING", "mode": "NULLABLE"},
      {"name": "start_date", "type": "DATE", "mode": "NULLABLE"}
    ]
  },
  {"name": "status", "type": "STRING", "mode": "NULLABLE"},
  {
    "name": "organizational_unit", 
    "type": "RECORD",
    "mode": "NULLABLE",
    "fields": [
      {"name": "bu", "type": "STRING", "mode": "NULLABLE"},
      {"name": "CoE", "type": "STRING", "mode": "NULLABLE"},
      {"name": "location", "type": "STRING", "mode": "NULLABLE"},
      {"name": "level", "type": "STRING", "mode": "NULLABLE"},
      {"name": "group", "type": "STRING", "mode": "NULLABLE"},
      {"name": "sub_group", "type": "STRING", "mode": "NULLABLE"},
      {"name": "CoE_swat", "type": "BOOLEAN", "mode": "NULLABLE"},
      {
        "name": "CoE_leader",
        "type": "RECORD",
        "mode": "NULLABLE",
        "fields": [
          {"name": "name", "type": "STRING", "mode": "NULLABLE"},
          {"name": "email", "type": "STRING", "mode": "NULLABLE"}
        ]
      },
      {
        "name": "CoE_sub_leader",
        "type": "RECORD", 
        "mode": "NULLABLE",
        "fields": [
          {"name": "name", "type": "STRING", "mode": "NULLABLE"},
          {"name": "email", "type": "STRING", "mode": "NULLABLE"}
        ]
      },
      {
        "name": "new_hinext_mgr",
        "type": "RECORD",
        "mode": "NULLABLE", 
        "fields": [
          {"name": "name", "type": "STRING", "mode": "NULLABLE"},
          {"name": "email", "type": "STRING", "mode": "NULLABLE"}
        ]
      }
    ]
  },
  {
    "name": "projects",
    "type": "RECORD",
    "mode": "REPEATED",
    "fields": [
      {"name": "project_id", "type": "STRING", "mode": "NULLABLE"},
      {"name": "name", "type": "STRING", "mode": "NULLABLE"},
      {"name": "roll_off_date", "type": "DATE", "mode": "NULLABLE"},
      {"name": "project_start_date", "type": "DATE", "mode": "NULLABLE"},
      {
        "name": "work_logs",
        "type": "RECORD",
        "mode": "REPEATED",
        "fields": [
          {"name": "month", "type": "STRING", "mode": "NULLABLE"},
          {"name": "work_log_hours", "type": "NUMERIC", "mode": "NULLABLE"},
          {"name": "billable_percentage", "type": "NUMERIC", "mode": "NULLABLE"}
        ]
      }
    ]
  },
  {
    "name": "timesheet_status",
    "type": "RECORD",
    "mode": "REPEATED",
    "fields": [
      {"name": "month", "type": "STRING", "mode": "NULLABLE"},
      {"name": "status", "type": "STRING", "mode": "NULLABLE"}
    ]
  },
  {"name": "updated_at", "type": "TIMESTAMP", "mode": "NULLABLE"},
  {"name": "created_at", "type": "TIMESTAMP", "mode": "NULLABLE"}
]
```

</details><div class="SCXW14938372 BCX8" id="bkmrk-1st%C2%A0-phase-%2823%2F07%2F20"></div><div class="OutlineElement Ltr SCXW14938372 BCX8" id="bkmrk-priority%E2%80%AF%C2%A0-task-name"><div class="TableContainer Ltr SCXW14938372 BCX8"><div aria-hidden="true" class="WACAltTextDescribedBy SCXW14938372 BCX8" id="bkmrk--1"></div></div></div>#### <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Concern:</span></span><span class="EOP SCXW14938372 BCX8" data-ccp-props="{}"> </span>

<div class="SCXW14938372 BCX8" id="bkmrk-%E2%80%AFshould-we-use-%E2%80%9Cmeet"><div class="ListContainerWrapper SCXW14938372 BCX8">- <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"> </span><span class="NormalTextRun SCXW14938372 BCX8">Should we use “Meet Recordings Insights” template for Looker?</span></span><span class="EOP SCXW14938372 BCX8" data-ccp-props="{"335551550":6,"335551620":6}"> </span>

</div></div>#### <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Improvement:</span></span><span class="EOP SCXW14938372 BCX8" data-ccp-props="{}"> </span>

<div class="SCXW14938372 BCX8" id="bkmrk-should-we-set-up-a-c"><div class="ListContainerWrapper SCXW14938372 BCX8">- <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Should we </span><span class="NormalTextRun SCXW14938372 BCX8">set up</span><span class="NormalTextRun SCXW14938372 BCX8"> a cronjob</span> <span class="NormalTextRun SCXW14938372 BCX8">for cleaning</span><span class="NormalTextRun SCXW14938372 BCX8"> up data?</span></span><span class="EOP SCXW14938372 BCX8" data-ccp-props="{}"> </span>

</div></div>

# Phase: (Wednesday - Tuesday)

#### <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">1</span></span><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun Superscript SCXW14938372 BCX8" data-fontsize="12">st</span></span><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"> phase (23/07/2025 – 29/07/2025)</span></span>

<table border="1" id="bkmrk-ord.-priority-task-n" style="border-collapse: collapse; width: 100%; height: 178.781px;"><colgroup><col style="width: 6.31704%;"></col><col style="width: 9.53587%;"></col><col style="width: 59.3557%;"></col><col style="width: 7.15137%;"></col><col style="width: 8.46246%;"></col><col style="width: 9.17759%;"></col></colgroup><tbody><tr style="height: 29.7969px;"><td><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Ord.</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Priority</span></span></td><td class="FirstRow AdvancedProofingLightMode ContextualSpellingLightMode SpellingErrorLightMode SimilarityReviewedBlack SimilarityUnreviewedLightMode AddInCritiqueRedLightMode AddInCritiqueGreenLightMode AddInCritiqueBlueLightMode AddInCritiqueLavenderLightMode AddInCritiqueBerryLightMode HighContrastShading SCXW14938372 BCX8" data-celllook="69905" role="columnheader" style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Task name</span></span>

</td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Assign </span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Estimate</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Status </span></span></td></tr><tr style="height: 29.7969px;"><td><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">1</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">High </span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Define IAM Roles, Service Account<span class="EOP SCXW14938372 BCX8" data-ccp-props="{}"> </span></span></span>

</td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"> Hằng</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">1 day </span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Done</span></span></td></tr><tr style="height: 29.7969px;"><td><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">2</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Medium</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Build Base Infrastructure</span></span>

</td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"> Luân</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">1 day</span></span></td><td style="height: 29.7969px;">Done</td></tr><tr style="height: 29.7969px;"><td><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">3</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">High</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">\[Cloud Function\] Implement handle file Excel</span></span>

</td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Luân</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">2 days</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Done</span></span></td></tr><tr style="height: 29.7969px;"><td><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">4</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"> High</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">\[Looker\] Investigate, Define output data<span class="EOP SCXW14938372 BCX8" data-ccp-props="{}"> </span></span></span>

</td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Nam</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">2 days</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Done</span></span></td></tr></tbody></table>

#### <span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">2nd phase (30/07/2025 – 05/08/2025)</span></span>

<table border="1" id="bkmrk-ord.-priority-task-n-1" style="border-collapse: collapse; width: 100%; height: 372.75px;"><colgroup><col style="width: 6.31704%;"></col><col style="width: 9.53587%;"></col><col style="width: 59.3557%;"></col><col style="width: 7.15137%;"></col><col style="width: 8.46246%;"></col><col style="width: 9.17759%;"></col></colgroup><tbody><tr style="height: 29.7969px;"><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Ord.</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Priority</span></span></td><td class="FirstRow AdvancedProofingLightMode ContextualSpellingLightMode SpellingErrorLightMode SimilarityReviewedBlack SimilarityUnreviewedLightMode AddInCritiqueRedLightMode AddInCritiqueGreenLightMode AddInCritiqueBlueLightMode AddInCritiqueLavenderLightMode AddInCritiqueBerryLightMode HighContrastShading SCXW14938372 BCX8" data-celllook="69905" role="columnheader" style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Task name</span></span>

</td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Assign </span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Estimate</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Status </span></span></td></tr><tr style="height: 29.7969px;"><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">1</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">High </span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"><span data-teams="true">Improve logic update log works, update schemas (Firestore and BQ)</span></span></span>

</td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Luân</span></span></td><td style="height: 29.7969px;">2 days</td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">On going</span></span></td></tr><tr style="height: 113.781px;"><td style="height: 113.781px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">2</span></span></td><td style="height: 113.781px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Medium</span></span></td><td style="height: 113.781px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"><span data-teams="true">\[Firebase\] Investigate Firebase UI Project Incomming and Key Member of CoE in each Project:  
</span></span></span>

\+ Firebase Authentication

\+ Form upload Excel file

\+ Form Project Incoming

\+ Form Key member of CoE in each Project

</td><td style="height: 113.781px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Tân</span></span></td><td style="height: 113.781px;"> </td><td style="height: 113.781px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">On going</span></span></td></tr><tr style="height: 80.1875px;"><td style="height: 80.1875px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">3</span></span></td><td style="height: 80.1875px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Medium</span></span></td><td style="height: 80.1875px;">Investigate Architecture and Schemas

\+ Firebase schema  
\+ BigQuery schema  
\+ Architecture

</td><td style="height: 80.1875px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Luân</span></span></td><td style="height: 80.1875px;">1 day</td><td style="height: 80.1875px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">On going</span></span></td></tr><tr style="height: 29.7969px;"><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">4</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">High</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"><span data-teams="true">\[Looker\] Improve layout and function</span></span></span>

</td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Nam</span></span></td><td style="height: 29.7969px;">2 days</td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">On going</span></span></td></tr><tr style="height: 29.7969px;"><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">5</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Medium</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"><span data-teams="true">Investigate Conversation Analysis in Looker Studio</span></span></span>

</td><td style="height: 29.7969px;">Tân</td><td style="height: 29.7969px;"> </td><td style="height: 29.7969px;">To do</td></tr><tr style="height: 29.7969px;"><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">6</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">Medium</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"><span data-teams="true">Investigate AI Gemini to extract excel file</span></span></span>

</td><td style="height: 29.7969px;">Hằng</td><td style="height: 29.7969px;">  
</td><td style="height: 29.7969px;">On going</td></tr><tr style="height: 29.7969px;"><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">7</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8">High</span></span></td><td style="height: 29.7969px;"><span class="TextRun SCXW14938372 BCX8" data-contrast="auto" lang="EN-US" xml:lang="EN-US"><span class="NormalTextRun SCXW14938372 BCX8"><span data-teams="true">Embedded Looker into Firebase UI</span></span></span>

</td><td style="height: 29.7969px;">Nam</td><td style="height: 29.7969px;">2 days</td><td style="height: 29.7969px;">To do</td></tr></tbody></table>

# UI/UX

### 1. UI &amp; UX Design

1. 1. **<span class="ng-star-inserted">Layout:</span>**<span class="ng-star-inserted"> A modern, professional design featuring a persistent left-hand navigation sidebar and a main content area.</span>
    2. **<span class="ng-star-inserted">Navigation:</span>**<span class="ng-star-inserted"> Intuitive navigation links for </span><span class="inline-code ng-star-inserted">Dashboard</span><span class="ng-star-inserted">, </span><span class="inline-code ng-star-inserted">Resource Planner</span><span class="ng-star-inserted">, </span><span class="inline-code ng-star-inserted">Member Directory</span><span class="ng-star-inserted">, </span><span class="inline-code ng-star-inserted">Projects</span><span class="ng-star-inserted">, and a role-restricted </span><span class="inline-code ng-star-inserted">Settings</span><span class="ng-star-inserted"> area.</span>
    3. **<span class="ng-star-inserted">Accessibility:</span>**<span class="ng-star-inserted"> A clean layout with clear typography and interactive elements designed for ease of use. The AI Assistant provides an alternative, conversational method for data access.</span>
    4. **<span class="ng-star-inserted">Visual Style:</span>**<span class="ng-star-inserted"> A data-centric design that uses charts, graphs, and tables effectively to convey information without clutter. The color scheme will be professional and aligned with company branding.</span>

### <span class="ng-star-inserted">2. Overall Application Structure:</span>

1. <span class="ng-star-inserted">**Top Bar:** Contain the logo, user name, notifications, and logout menu.</span>
2. **<span class="ng-star-inserted">Left Navigation Sidebar:</span>**<span class="ng-star-inserted"> Provides access to the main sections of the application.</span>
3. **<span class="ng-star-inserted">Main Content Area:</span>**<span class="ng-star-inserted"> Displays the selected view (dashboards, lists, forms).</span>

### <span class="ng-star-inserted"><span class="ng-star-inserted">3. Visual Wireframe</span></span>**<span class="ng-star-inserted">  
</span>**

```markdown
+--------------------------------------------------------------------------------------+
| [Logo] CoE Management Platform                  [Notifications] [User Name v]        |
+--------------------------------------------------------------------------------------+
|                                     |                                                |
|  [NAVBAR]                           |  [MAIN CONTENT AREA]                           |
|                                     |                                                |
|  > Dashboard                        |  This area changes based on the                |
|  > Resource Planner                 |  navigation selection.                         |
|  > Member Directory                 |                                                |
|  > Projects                         |                                                |
|  > Settings (Admin only)            |                                                |
|    - Data Import                    |  (Sub-navigation for Settings)                 |
|    - Key Members                    |                                                |
|    - Notifications                  |                                                |
|                                     |                                                |
+--------------------------------------------------------------------------------------+
```

### <span class="ng-star-inserted">4. Screen-by-Screen UI  
</span>

#### **<span class="ng-star-inserted">4.1. Main View: Dashboard (Default Landing Page)</span>**

<span class="ng-star-inserted">The command center for a high-level overview.</span>

- **<span class="ng-star-inserted">Global Filters:</span>**<span class="ng-star-inserted"> A prominent filter bar at the top with selectors for </span>**<span class="ng-star-inserted">Date Range, Business Unit, Practice, and Location</span>**<span class="ng-star-inserted">.</span>
- **<span class="ng-star-inserted">Dashboard Widgets:</span>**<span class="ng-star-inserted"> A grid of interactive cards for **<span class="ng-star-inserted">CoE Member Directory</span>, Group Performance, Resource Distribution, and the Resource Allocation Tree Chart.**</span>

#### **<span class="ng-star-inserted">4.2. View: Resource Planner (Member-Centric Timeline)</span>**

<span class="ng-star-inserted">The screen for strategic, long-term staffing.</span>

- **<span class="ng-star-inserted">Layout:</span>**<span class="ng-star-inserted"> A two-panel view with a filterable member list on the left and the main timeline chart on the right.</span>
- **<span class="ng-star-inserted">Timeline Chart:</span>**<span class="ng-star-inserted"> The interactive chart showing each member's project assignments, start/roll-off dates, and utilization percentage on hover.</span>

#### **<span class="ng-star-inserted">4.3. View: Member Directory</span>**

<span class="ng-star-inserted">The central hub for finding personnel.</span>

- **<span class="ng-star-inserted">Layout:</span>**<span class="ng-star-inserted"> A powerful, full-page table with advanced filtering.</span>
- **<span class="ng-star-inserted">Action:</span>**<span class="ng-star-inserted"> Clicking a member's name navigates to their </span>**<span class="ng-star-inserted">Detailed Member Profile Page</span>**<span class="ng-star-inserted"> (with tabs for Overview, Projects, Skills, etc.).</span>

#### **<span class="ng-star-inserted">4.4. View: Projects</span>**

<span class="ng-star-inserted">For managing the project pipeline.</span>

- **<span class="ng-star-inserted">Layout:</span>**<span class="ng-star-inserted"> A list or card view of all projects.</span>
- **<span class="ng-star-inserted">Primary Action:</span>**<span class="ng-star-inserted"> A </span>**<span class="ng-star-inserted">\[+ Add New Project\]</span>**<span class="ng-star-inserted"> button that opens a form for inputting project details.</span>

#### **<span class="ng-star-inserted">4.5. View: Settings (Visible to Admin/Authorized Roles Only)</span>**

<span class="ng-star-inserted">The administrative area for application management, featuring its own sub-navigation.</span>

- - **<span class="ng-star-inserted">Sub-View: Data Import</span>**
        
        
        - **<span class="ng-star-inserted">Purpose:</span>**<span class="ng-star-inserted"> To provide a secure and simple interface for authorized administrators to upload the two core data source files.</span>
        - **<span class="ng-star-inserted">UI Layout:</span>**<span class="ng-star-inserted"> The page will be divided into two distinct, clearly labeled sections.</span>
        - **<span class="ng-star-inserted">Section 1: CoE Member Profiles</span>**
            
            
            - **<span class="ng-star-inserted">Title:</span>**<span class="ng-star-inserted"> "Upload CoE Member Data"</span>
            - **<span class="ng-star-inserted">Instructions:</span>**<span class="ng-star-inserted"> "Upload the Excel file containing information for all CoE members. The file must contain the required columns (LDAP, Oracle ID, etc.)."</span>
            - **<span class="ng-star-inserted">Template Link:</span>**<span class="ng-star-inserted"> A link to "Download Template" to ensure data format consistency and prevent errors.</span>
            - **<span class="ng-star-inserted">Upload Component:</span>**<span class="ng-star-inserted"> A drag-and-drop area or a standard "Choose File" button.</span>
            - **<span class="ng-star-inserted">Action Button:</span>**<span class="ng-star-inserted"> A clear "Process Member File" button.</span>
        - **<span class="ng-star-inserted">Section 2: Monthly Utilization</span>**
            
            
            - **<span class="ng-star-inserted">Title:</span>**<span class="ng-star-inserted"> "Upload Monthly Utilization Data"</span>
            - **<span class="ng-star-inserted">Instructions:</span>**<span class="ng-star-inserted"> "Upload the Excel file containing monthly billable hours and utilization for all employees."</span>
            - **<span class="ng-star-inserted">Template Link:</span>**<span class="ng-star-inserted"> A link to "Download Template".</span>
            - **<span class="ng-star-inserted">Upload Component:</span>**<span class="ng-star-inserted"> A separate drag-and-drop area or "Choose File" button.</span>
            - **<span class="ng-star-inserted">Action Button:</span>**<span class="ng-star-inserted"> A clear "Process Utilization File" button.</span>
        - **<span class="ng-star-inserted">Feedback Mechanism:</span>**<span class="ng-star-inserted"> After clicking "Process," the UI will provide immediate feedback: a success message upon completion or a detailed error message if validation fails (e.g., "Error in Member File: Row 25 is missing a value for 'Email'. Please correct the file and re-upload.").</span>
    - **<span class="ng-star-inserted">Sub-View: Key Member Management</span>**
        
        
        - <span class="ng-star-inserted">An interface to designate individuals as "Key Members."</span>
    - **<span class="ng-star-inserted">Sub-View: Notification Preferences</span>**
        
        
        - <span class="ng-star-inserted">Controls for the automated timesheet reminder emails (TBD).</span>