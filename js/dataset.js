
function highlight_data() {


    hljs.highlightAll();

    // all the snippets to be highlighted
    collection = document.getElementsByClassName("snippet");

    for (code of collection){

        classname=code.className
        classes=classname.split(" ")

        id_row=-1

        for (c of classes){
            if (c.indexOf("row_") != -1){
                id_row=c.replace("row_","")
                break
            }
        }


        text = code.innerHTML;


        for (let i = 0; i < 30; i++) {
            text2=color_comments(text, "<span class=\"hljs-variable constant_\">STARTCOMMENT</span>", parseInt(id_row))

            if (text2==text){
                text2=text
                break
            }
            text=text2
        }

        for (let i = 0; i < 30; i++) {
            text2=color_comments(text, "STARTCOMMENT", parseInt(id_row))

            if (text2==text){
                text2=text
                break
            }
            text=text2
        }

        text=add_tooltip(text, id_row)

        for (let i = 0; i < 30; i++) {
            text2=color_referenced_lines(text, "<span class=\"hljs-variable constant_\">STARTREF</span>")

            if (text2==text){
                text2=text
                break
            }
            text=text2
        }

        for (let i = 0; i < 30; i++) {
            text2=color_referenced_lines(text, "STARTREF")

            if (text2==text){
                text2=text
                break
            }
            text=text2
        }

        code.innerHTML = text;

    }

    $('.button_invisible').tooltip({trigger:'manual'}).tooltip('show');


}


function add_tooltip(text, id){

    var index = text.lastIndexOf("TOOLTIP");

    text_new=text.substring(0, index)
    text_new+=""
    text_new+=text.substring(index+"TOOLTIP".length)
    text=text_new

    // if (id==-1){

    //     text_new=text.substring(0, index)
    //     text_new+="<button type=\"button\" class=\"btn button_invisible\" data-bs-toggle=\"tooltip\" data-bs-placement=\"right\" title=\"Tooltip on right\"> &nbsp;</button>"
    //     text_new+=text.substring(index+"TOOLTIP".length)
    //     text=text_new

    //     // text = text.replace("ENDCOMMENT", "</span><button type=\"button\" class=\"btn button_invisible\" data-bs-toggle=\"tooltip\" data-bs-placement=\"right\" title=\"Tooltip on right\"> &nbsp;</button>")
    // }
    // else {
    //     // text = text.replace("ENDCOMMENT", "</span><button type=\"button\" class=\"btn button_invisible\" data-bs-toggle=\"tooltip\" data-bs-placement=\"right\" title=\"Tooltip " +id.toString()+ "\"> &nbsp;</button>")

    //     text_new=text.substring(0, index)
    //     // text_new+="<button type=\"button\" class=\"btn button_invisible\" data-bs-toggle=\"tooltip\" data-bs-placement=\"right\" title=\"Tooltip " +id.toString()+ "\"> &nbsp;</button>"
    //     text_new+="<button> "+dict_tooltip[id]+"</button>"
    //     text_new+=text.substring(index+"TOOLTIP".length)
    //     text=text_new


    // }

    // text=replaceAll(text, "TOOLTIP", "")

    text = text.replace(/TOOLTIP/g, '');


    return text



}

function color_referenced_lines(text, startref){

    start=text.indexOf(startref)
    // end=text.indexOf("ENDCOMMENT")

    end=get_end_referenced(start)

    if (start==-1 || end==-1){
        return text
    }

    text_new=text.substring(0, start)
    text_new+="<span class=\"highlighted\">"
    text_new+=text.substring(start+startref.length)

    delta=text_new.length-text.length

    text=text_new


    // console.log(text)

    text_new=text.substring(0, end+delta)
    text_new+="</span>"
    text_new+=text.substring(end+delta+"ENDREF".length)
    text=text_new

    // text = text.replace("STARTREF", "<span class=\"highlighted\">")


    // text = text.replace("ENDREF", "</span>")

    // console.log(text)
    // console.log("B")

    return text

}

function get_end_referenced(start){

    var Indices = [];

    var indexOccurence = text.indexOf("ENDREF", 0);

    while(indexOccurence >= 0) {
        Indices.push(indexOccurence);

        indexOccurence = text.indexOf("ENDREF", indexOccurence + 1);
    }

    for (c of Indices){
        if (c>start){
            return c
        }
    }

    return -1

}


function get_end_comment(start){

    var Indices = [];

    var indexOccurence = text.indexOf("ENDCOMMENT", 0);

    while(indexOccurence >= 0) {
        Indices.push(indexOccurence);

        indexOccurence = text.indexOf("ENDCOMMENT", indexOccurence + 1);
    }

    for (c of Indices){
        if (c>start){
            return c
        }
    }

    return -1

}



function color_comments(text, startcomment, id=-1){
    start=text.indexOf(startcomment)
    // end=text.indexOf("ENDCOMMENT")

    end=get_end_comment(start)

    if (start==-1 || end==-1){
        return text
    }

    var startingIndices = [];

    var indexOccurence = text.indexOf("hljs-comment", 0);

    while(indexOccurence >= 0) {
        startingIndices.push(indexOccurence);

        indexOccurence = text.indexOf("hljs-comment", indexOccurence + 1);
    }

    // console.log(startingIndices)

    for (occ of startingIndices){
        if (occ>=start && occ<=end) {
            new_text=text.substring(0, occ)
            new_text+="HLJS-COMMENT"
            new_text+=text.substring(occ+"hljs-comment".length)

            text=new_text
        }
    }

    text=text.replace(new RegExp("HLJS-COMMENT", 'g'), '');
    // console.log(new_text)

    text=new_text
    // text = text.replace("<span class=\"hljs-variable constant_\">STARTCOMMENT</span>", "<span class=\"bold-red\" style=\"color: red!important;\">")

    text_new=text.substring(0, start)
    text_new+="<span class=\"bold-red\" style=\"color: red!important;\">"
    text_new+=text.substring(start+startcomment.length)

    delta=text_new.length-text.length

    text=text_new


    // text = text.replace("STARTCOMMENT", "<span class=\"bold-red\">")


    // console.log(text)

    text_new=text.substring(0, end+delta)
    text_new+="</span>TOOLTIP"
    text_new+=text.substring(end+delta+"ENDCOMMENT".length)
    text=text_new

    // text = text.replace("ENDCOMMENT", "</span>TOOLTIP")

    // console.log(text)

    // console.log("AA")

    return text


}

dict_stored = {};

// 1 UPDATED
dict_stored[0]="private void updateCharge() {\n\n        widgetSettings.reload();\n        IntentFilter ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);\n        Intent batteryStatus = mContext.registerReceiver(null, ifilter);\n\n        if (batteryStatus != null) {\n\n            int level = batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);\n            int scale = batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1);\n            int batteryIconId = batteryStatus.getIntExtra(BatteryManager.EXTRA_ICON_SMALL, 0);\n\n            STARTCOMMENT  // Set battery icon and text  ENDCOMMENT\n             STARTREF int battery = Math.round((level / (float) scale) * 100f);\n            String msg;\n            if (battery != 0) {\n                String battlvl = battery + \"%\";\n                msg = battlvl;\n                widgetSettings.set(Constants.PREF_BATT_LEVEL, battlvl);\n            } else {\n                msg = \"N/A%\";\n            } ENDREF\n\n            LevelListDrawable batteryLevel = (LevelListDrawable) mContext.getResources().getDrawable(batteryIconId);\n            batteryLevel.setLevel(level);\n\n            getHost().runTaskOnUI(AmazModLauncher.this, new Runnable() {\n                @Override\n                public void run() {\n                    if (battValueTV != null)\n                        battValueTV.setText(msg);\n                    if (battIconImg != null)\n                        battIconImg.setImageDrawable(batteryLevel);\n                }\n            });\n\n        } else\n            Logger.error(\"AmazModLauncher updateCharge error: null batteryStatus!\");\n\n    }"//4435 UPDATED
// 4435 UPDATED
dict_stored[1]="private void drawTextWithFont(DocumentData documentData, Font font, Canvas canvas) {\n    Typeface typeface = getTypeface(font);\n    if (typeface == null) {\n      return;\n    }\n    String text = documentData.text;\n    TextDelegate textDelegate = lottieDrawable.getTextDelegate();\n    if (textDelegate != null) {\n      text = textDelegate.getTextInternal(getName(), text);\n    }\n    fillPaint.setTypeface(typeface);\n    float textSize;\n    if (textSizeCallbackAnimation != null) {\n      textSize = textSizeCallbackAnimation.getValue();\n    } else {\n      textSize = documentData.size;\n    }\n    fillPaint.setTextSize(textSize * Utils.dpScale());\n    strokePaint.setTypeface(fillPaint.getTypeface());\n    strokePaint.setTextSize(fillPaint.getTextSize());\n\n    // Line height\n    float lineHeight = documentData.lineHeight * Utils.dpScale();\n\n    // Calculate tracking\n    float tracking = documentData.tracking / 10f;\n    if (trackingCallbackAnimation != null) {\n      tracking += trackingCallbackAnimation.getValue();\n    } else if (trackingAnimation != null) {\n      tracking += trackingAnimation.getValue();\n    }\n    tracking = tracking * Utils.dpScale() * textSize / 100.0f;\n\n    // Split full text in multiple lines\n    List<String> textLines = getTextLines(text);\n    int textLineCount = textLines.size();\n    for (int l = 0; l < textLineCount; l++) {\n\n      String textLine = textLines.get(l);\n      // We have to manually add the tracking between characters as the strokePaint ignores it\n      float textLineWidth = strokePaint.measureText(textLine) + (textLine.length() - 1) * tracking;\n\n      canvas.save();\n\n      STARTCOMMENT // Apply horizontal justification ENDCOMMENT\n      STARTREF applyJustification(documentData.justification, canvas, textLineWidth); ENDREF\n\n      // Center text vertically\n      float multilineTranslateY = (textLineCount - 1) * lineHeight / 2;\n      float translateY = l * lineHeight - multilineTranslateY;\n      canvas.translate(0, translateY);\n\n      // Draw each line\n      drawFontTextLine(textLine, documentData, canvas, tracking);\n\n      // Reset canvas\n      canvas.restore();\n    }\n  }"
//274 UPDATED
dict_stored[2]="@Override\n        void setupSetter(Class targetClass) {\n            if (mProperty != null) {\n                return;\n            }\n            STARTCOMMENT // Check new static hashmap<propName, int> for setter method ENDCOMMENT\n            STARTREF try {\n                mPropertyMapLock.writeLock().lock();\n                HashMap<String, Integer> propertyMap = sJNISetterPropertyMap.get(targetClass);\n                if (propertyMap != null) {\n                    Integer mJniSetterInteger = propertyMap.get(mPropertyName);\n                    if (mJniSetterInteger != null) {\n                        mJniSetter = mJniSetterInteger;\n                    }\n                }\n                if (mJniSetter == 0) {\n                    String methodName = getMethodName(\"set\", mPropertyName);\n                    mJniSetter = nGetFloatMethod(targetClass, methodName);\n                    if (mJniSetter != 0) {\n                        if (propertyMap == null) {\n                            propertyMap = new HashMap<String, Integer>();\n                            sJNISetterPropertyMap.put(targetClass, propertyMap);\n                        }\n                        propertyMap.put(mPropertyName, mJniSetter);\n                    }\n                }\n            } catch (NoSuchMethodError e) { ENDREF\n                // Couldn't find it via JNI - try reflection next. Probably means the method\n                // doesn't exist, or the type is wrong. An error will be logged later if\n                // reflection fails as well.\n            STARTREF } finally {\n                mPropertyMapLock.writeLock().unlock();\n            } ENDREF\n            if (mJniSetter == 0) {\n                // Couldn't find method through fast JNI approach - just use reflection\n                super.setupSetter(targetClass);\n            }\n        }"
//947 UPDATED
dict_stored[3]="private static void produceEmptyPdfFile(File targetFile)\n    {\n        // If improvement PDFBOX-914 is incorporated, we can do this with a straight call to\n        // org.apache.pdfbox.TextToPdf.createPDFFromText(new StringReader(\"\"));\n        // https://issues.apache.org/jira/browse/PDFBOX-914\n\n        PDPage pdfPage = new PDPage();\n        try (PDDocument pdfDoc = new PDDocument();\n             PDPageContentStream ignore = new PDPageContentStream(pdfDoc, pdfPage))\n        {\n            // Even though, we want an empty PDF, some libs (e.g. PDFRenderer) object to PDFs\n            // that have literally nothing in them. So we'll put a content stream in it.\n            pdfDoc.addPage(pdfPage);\n\n            STARTCOMMENT // Now write the in-memory PDF document into the temporary file. ENDCOMMENT\n            STARTREF pdfDoc.save(targetFile.getAbsolutePath());\n        } ENDREF\n        catch (IOException iox)\n        {\n            throw new TransformException(INTERNAL_SERVER_ERROR.value(),\n                \"Error creating empty PDF file\", iox);\n        }\n    }"
//0 UPDATED
dict_stored[4]="  public void executeImpl()\n    {\n        if (logger.isDebugEnabled())\n        {\n            logger.debug(\"Job \" + this.getClass().getSimpleName() + \" starting.\");\n        }\n\n        AuthenticationUtil.runAs(new RunAsWork<Object>()\n        {\n            public Object doWork()\n            {\n                // Query is for all records that are due for review and for which\n                // notification has not been sent.\n                StringBuilder queryBuffer = new StringBuilder();\n                queryBuffer.append(\"ASPECT:\"rma:vitalRecord\");\n                queryBuffer.append(\"AND @rma\\:reviewAsOf:[MIN TO NOW] \");\n                // exclude destroyed electronic records and destroyed nonElectronic records with kept metadata\n                queryBuffer.append(\"AND -ASPECT:\"rma:ghosted\");\n                String query = queryBuffer.toString();\n\n                ResultSet results = searchService.query(StoreRef.STORE_REF_WORKSPACE_SPACESSTORE, SearchService.LANGUAGE_FTS_ALFRESCO, query);\n                final List<NodeRef> resultNodes = results.getNodeRefs();\n                results.close();\n\n                if (logger.isDebugEnabled())\n                {\n                    logger.debug(\"Found \" + resultNodes.size() + \" nodes due for review and without notification.\");\n                }\n\n                //If we have something to do and a template to do it with\n                if(resultNodes.size() != 0)\n                {\n                    STARTCOMMENT // Send the email message - but we must not retry since email is not transactional  ENDCOMMENT\n                     STARTREF RetryingTransactionCallback<Void> txCallbackSendEmail = new RetryingTransactionCallback<Void>()\n                    { ENDREF\n                        // Set the notification issued property.\n                        STARTREF public Void execute()\n                        { ENDREF\n                            // Send notification\n                            STARTREF recordsManagementNotificationHelper.recordsDueForReviewEmailNotification(resultNodes);\n\n                            return null;\n                        }\n                    }; ENDREF\n\n                    /**\n                     * Now do the work, one action in each transaction\n                     */\n                    // don't retry the send email\n                    retryingTransactionHelper.setMaxRetries(0);\n                    retryingTransactionHelper.doInTransaction(txCallbackSendEmail);\n                }\n                return null;\n            }\n\n        }, AuthenticationUtil.getSystemUserName());\n\n        if (logger.isDebugEnabled())\n        {\n            logger.debug(\"Job \" + this.getClass().getSimpleName() + \" finished\");\n        }\n    }  // end of execute method "
//2091 UPDATED
dict_stored[5]="        synchronized boolean put(PresenceMessage item) {\n            String key = item.memberKey();\n            /* we've seen this member, so do not remove it at the end of sync */\n            if(residualMembers != null)\n                residualMembers.remove(key);\n\n            STARTCOMMENT // check if there is a newer existing member (or absent witness) ENDCOMMENT\n             STARTREF if (hasNewerItem(key, item))\n                return false; ENDREF\n\n            members.put(key, item);\n            return true;\n        }"
//847 UPDATED
dict_stored[6]="    private void ensureList() {\n        if (mList != null) {\n            return;\n        }\n        View root = getView();\n        if (root == null) {\n            throw new IllegalStateException(\"Content view not yet created\");\n        }\n        if (root instanceof ListView) {\n            mList = (ListView)root;\n        } else {\n            mStandardEmptyView = (TextView)root.findViewById(\n                    com.android.internal.R.id.internalEmpty);\n            if (mStandardEmptyView == null) {\n                mEmptyView = root.findViewById(android.R.id.empty);\n            } else {\n                mStandardEmptyView.setVisibility(View.GONE);\n            }\n            mProgressContainer = root.findViewById(com.android.internal.R.id.progressContainer);\n            mListContainer = root.findViewById(com.android.internal.R.id.listContainer);\n            View rawListView = root.findViewById(android.R.id.list);\n            if (!(rawListView instanceof ListView)) {\n                throw new RuntimeException(\n                        \"Content has view with id attribute 'android.R.id.list' \"\n                        + \"that is not a ListView class\");\n            }\n            mList = (ListView)rawListView;\n            if (mList == null) {\n                throw new RuntimeException(\n                        \"Your content must have a ListView whose id attribute is \" +\n                        \"'android.R.id.list'\");\n            }\n            if (mEmptyView != null) {\n                mList.setEmptyView(mEmptyView);\n            } else if (mEmptyText != null) {\n                mStandardEmptyView.setText(mEmptyText);\n                mList.setEmptyView(mStandardEmptyView);\n            }\n        }\n        mListShown = true;\n        mList.setOnItemClickListener(mOnClickListener);\n        STARTREF if (mAdapter != null) { ENDREF\n            ListAdapter adapter = mAdapter;\n            mAdapter = null;\n            setListAdapter(adapter);\n        STARTREF } else { ENDREF\n            STARTCOMMENT // We are starting without an adapter, so assume we won't\n            // have our data right away and start with the progress indicator. ENDCOMMENT\n            STARTREF if (mProgressContainer != null) {\n                setListShown(false, false);\n            }\n        } ENDREF\n        mHandler.post(mRequestFocus);\n    }"
// 1656 UPDATED
dict_stored[7]="  protected void terminateMultiInstanceRoot(DelegateExecution execution, CommandContext commandContext,\n      ExecutionEntityManager executionEntityManager) {\n\n    STARTCOMMENT // When terminateMultiInstance is 'true', we look for the multi instance root and delete it from there. ENDCOMMENT\n    STARTREF ExecutionEntity miRootExecutionEntity = executionEntityManager.findFirstMultiInstanceRoot((ExecutionEntity) execution);\n    if (miRootExecutionEntity != null) { ENDREF\n\n      // Create sibling execution to continue process instance execution before deletion\n      ExecutionEntity siblingExecution = executionEntityManager.createChildExecution(miRootExecutionEntity.getParent());\n      siblingExecution.setCurrentFlowElement(miRootExecutionEntity.getCurrentFlowElement());\n\n      STARTREF deleteExecutionEntities(executionEntityManager, miRootExecutionEntity, createDeleteReason(miRootExecutionEntity.getActivityId())); ENDREF\n\n      Context.getAgenda().planTakeOutgoingSequenceFlowsOperation(siblingExecution, true);\n    } else {\n      defaultTerminateEndEventBehaviour(execution, commandContext, executionEntityManager);\n    }\n  }"
// 3469 UPDATED
//dict_stored[8]="    public static List<String> complete(CommandSender sender, String arg) {\n        if (arg.isEmpty()) {\n            return null;\n        }\n\n        STARTCOMMENT // Load registered parameters ENDCOMMENT\n        STARTREF final HashMap<String, PrismParameterHandler> registeredParams = Prism.getParameters(); ENDREF\n\n        // Match command argument to parameter handler\n        for (final Entry<String, PrismParameterHandler> entry : registeredParams.entrySet()) {\n            if (entry.getValue().applicable(arg, sender) && entry.getValue().hasPermission(arg, sender)) {\n                return entry.getValue().tabComplete(arg, sender);\n            }\n        }\n\n        return null;\n    }"
dict_stored[8]="    public static List<String> complete(CommandSender sender, String arg) {\n        if (arg.isEmpty()) {\n            return null;\n        }\n\n        // Load registered parameters\n        final HashMap<String, PrismParameterHandler> registeredParams = Prism.getParameters();\n\n        STARTCOMMENT // Match command argument to parameter handler ENDCOMMENT\n        STARTREF for (final Entry<String, PrismParameterHandler> entry : registeredParams.entrySet()) {\n            if (entry.getValue().applicable(arg, sender) && entry.getValue().hasPermission(arg, sender)) {\n                return entry.getValue().tabComplete(arg, sender);\n            }\n        } ENDREF\n\n        return null;\n    }"
// 2029 UPDATED
dict_stored[9]="    public void addChange(String valuePath, String attributeName, int valueIndex, ChangeType changeType) {\n\n        if (ChangeType.value.equals(changeType)) {\n            if (m_changeTimer != null) {\n                STARTREF if (!m_changeTimer.matches(valuePath, attributeName, valueIndex)) { ENDREF\n                    STARTCOMMENT // only in case the change properties of the timer do not match the current change,\n                    // add the last change and start a new timer ENDCOMMENT\n                    STARTREF m_changeTimer.cancel();\n                    m_changeTimer.run();\n                    m_changeTimer = new ChangeTimer(valuePath, attributeName, valueIndex, changeType);\n                    m_changeTimer.schedule(CHANGE_TIMER_DELAY);\n                } ENDREF\n            } else {\n                m_changeTimer = new ChangeTimer(valuePath, attributeName, valueIndex, changeType);\n                m_changeTimer.schedule(CHANGE_TIMER_DELAY);\n            }\n        } else {\n            if (m_changeTimer != null) {\n                m_changeTimer.cancel();\n                m_changeTimer.run();\n            }\n            internalAddChange(valuePath, attributeName, valueIndex, changeType);\n        }\n    }"

dict_tooltip={}


function load_stored_data() {
    // load the data from the local storage in order to allow the user to choose from the predefined methods
    // dict_stored = document.getElementById("stored").value
    // // console.log(dict_stored)

    // dict_stored = JSON.parse(dict_stored);


    var name = "stored_data"

    var tableBody = document.createElement('tbody');

    // add a row with all the methods
    for (var r in dict_stored) {

        var row = document.createElement('tr');
        row.classList.add("row_table")

        var cell = document.createElement('td');
        cell.classList.add("hidden")
        cellData = r;

        cell.innerHTML = cellData;
        row.appendChild(cell);

        cellData = dict_stored[r]



        var cell = document.createElement('td');

        lines = cellData.split("\n")

        lines_new = []
        for (let j = 0; j < lines.length; j++) {
            // lines_new.push(lines[j].replaceAll("<", "&lt;").replaceAll(">", "&gt;"))
            lines_new.push(lines[j].replace(/</g, '&lt;').replace(/>/g, '&gt;'))


        }

        lines = lines_new

        console.log("LINES")
        console.log(lines)

        class_name="row_"+r.toString()

        code = "<div class='code_hilite'><pre><code class='snippet " +class_name+ "'>" + lines.join("\n") + "</pre></code></div>"
        cell.innerHTML = code

        console.log(code)

        row.appendChild(cell);

        // var cell = document.createElement('td');
        // cell.classList.add("hidden")
        // cellData = items[i];
        // cellData = cellData.replaceAll("<", "&lt;").replaceAll(">", "&gt;")

        // cell.innerHTML = cellData;
        // row.appendChild(cell);


        tableBody.appendChild(row);


    }

    table = document.getElementById(name);


    table.appendChild(tableBody);

}


window.onload = function () {

    load_stored_data()

    highlight_data()

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    $('.button_invisible').tooltip({trigger:'manual'}).tooltip('show');

//     $(document).ready(function () {
//   $('#table_stored').DataTable();
//   $('.dataTables_length').addClass('bs-select');
// });

}
