
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

// 626
dict_stored[0]="    public synchronized void sendFirstQueuedMessage() {\n        boolean success = true;\n        // get all the queued messages from the database\n        final Uri uri = Uri.parse(\"content://sms/queued\");\n        ContentResolver resolver = getContentResolver();\n        Cursor c = SqliteWrapper.query(this, resolver, uri,\n                        SEND_PROJECTION, null, null, \"date ASC\");   // date ASC so we send out in\n                                                                    // same order the user tried\n                                                                    // to send messages.\n        if (c != null) {\n            try {\n                if (c.moveToFirst()) {\n                    String msgText = c.getString(SEND_COLUMN_BODY);\n                    String address = c.getString(SEND_COLUMN_ADDRESS);\n                    int threadId = c.getInt(SEND_COLUMN_THREAD_ID);\n                    int status = c.getInt(SEND_COLUMN_STATUS);\n\n                    int msgId = c.getInt(SEND_COLUMN_ID);\n                    Uri msgUri = ContentUris.withAppendedId(Sms.CONTENT_URI, msgId);\n\n                    SmsMessageSender sender = new SmsSingleRecipientSender(this,\n                            address, msgText, threadId, status == Sms.STATUS_PENDING,\n                            msgUri);\n\n                    if (LogTag.DEBUG_SEND ||\n                            LogTag.VERBOSE ||\n                            Log.isLoggable(LogTag.TRANSACTION, Log.VERBOSE)) {\n                        Log.v(TAG, \"sendFirstQueuedMessage \" + msgUri +\n                                \", address: \" + address +\n                                \", threadId: \" + threadId);\n                    }\n\n                    try {\n                        sender.sendMessage(SendingProgressTokenManager.NO_TOKEN);;\n                        mSending = true;\n                    } catch (MmsException e) {\n                        Log.e(TAG, \"sendFirstQueuedMessage: failed to send message \" + msgUri\n                                + \", caught \", e);\n                        mSending = false;\n                        STARTREF messageFailedToSend(msgUri, SmsManager.RESULT_ERROR_GENERIC_FAILURE);\n                        success = false; ENDREF\n                        STARTCOMMENT // Sending current message fails. Try to send more pending messages\n                        // if there is any. ENDCOMMENT\n                        STARTREF sendBroadcast(new Intent(SmsReceiverService.ACTION_SEND_MESSAGE,\n                                null,\n                                this,\n                                SmsReceiver.class));\n                    } ENDREF\n                }\n            } finally {\n                c.close();\n            }\n        }\n        if (success) {\n            // We successfully sent all the messages in the queue. We don't need to\n            // be notified of any service changes any longer.\n            unRegisterForServiceStateChanges();\n        }\n    }"
//1434
dict_stored[1]="private void drawTextWithFont(DocumentData documentData, Font font, Canvas canvas) {\n    Typeface typeface = getTypeface(font);\n    if (typeface == null) {\n      return;\n    }\n    String text = documentData.text;\n    TextDelegate textDelegate = lottieDrawable.getTextDelegate();\n    if (textDelegate != null) {\n      text = textDelegate.getTextInternal(getName(), text);\n    }\n    fillPaint.setTypeface(typeface);\n    float textSize;\n    if (textSizeCallbackAnimation != null) {\n      textSize = textSizeCallbackAnimation.getValue();\n    } else {\n      textSize = documentData.size;\n    }\n    fillPaint.setTextSize(textSize * Utils.dpScale());\n    strokePaint.setTypeface(fillPaint.getTypeface());\n    strokePaint.setTextSize(fillPaint.getTextSize());\n\n    // Line height\n    float lineHeight = documentData.lineHeight * Utils.dpScale();\n\n    // Calculate tracking\n    float tracking = documentData.tracking / 10f;\n    if (trackingCallbackAnimation != null) {\n      tracking += trackingCallbackAnimation.getValue();\n    } else if (trackingAnimation != null) {\n      tracking += trackingAnimation.getValue();\n    }\n    tracking = tracking * Utils.dpScale() * textSize / 100.0f;\n\n    // Split full text in multiple lines\n    List<String> textLines = getTextLines(text);\n    int textLineCount = textLines.size();\n    for (int l = 0; l < textLineCount; l++) {\n\n      String textLine = textLines.get(l);\n      // We have to manually add the tracking between characters as the strokePaint ignores it\n      float textLineWidth = strokePaint.measureText(textLine) + (textLine.length() - 1) * tracking;\n\n      canvas.save();\n\n      // Apply horizontal justification\n      applyJustification(documentData.justification, canvas, textLineWidth);\n\n      STARTCOMMENT // Center text vertically ENDCOMMENT\n      STARTREF float multilineTranslateY = (textLineCount - 1) * lineHeight / 2;\n      float translateY = l * lineHeight - multilineTranslateY;\n      canvas.translate(0, translateY); ENDREF\n\n      // Draw each line\n      drawFontTextLine(textLine, documentData, canvas, tracking);\n\n      // Reset canvas\n      canvas.restore();\n    }\n  }"
//788
dict_stored[2]="@Override\n        void setupSetter(Class targetClass) {\n            if (mProperty != null) {\n                return;\n            }\n            STARTCOMMENT // Check new static hashmap<propName, int> for setter method ENDCOMMENT\n            STARTREF try {\n                mPropertyMapLock.writeLock().lock();\n                HashMap<String, Integer> propertyMap = sJNISetterPropertyMap.get(targetClass);\n                if (propertyMap != null) {\n                    Integer mJniSetterInteger = propertyMap.get(mPropertyName);\n                    if (mJniSetterInteger != null) {\n                        mJniSetter = mJniSetterInteger;\n                    }\n                }\n                if (mJniSetter == 0) {\n                    String methodName = getMethodName(\"set\", mPropertyName);\n                    mJniSetter = nGetFloatMethod(targetClass, methodName);\n                    if (mJniSetter != 0) {\n                        if (propertyMap == null) {\n                            propertyMap = new HashMap<String, Integer>();\n                            sJNISetterPropertyMap.put(targetClass, propertyMap);\n                        }\n                        propertyMap.put(mPropertyName, mJniSetter);\n                    }\n                }\n            } catch (NoSuchMethodError e) { ENDREF\n                // Couldn't find it via JNI - try reflection next. Probably means the method\n                // doesn't exist, or the type is wrong. An error will be logged later if\n                // reflection fails as well.\n            STARTREF } finally {\n                mPropertyMapLock.writeLock().unlock();\n            } ENDREF\n            if (mJniSetter == 0) {\n                // Couldn't find method through fast JNI approach - just use reflection\n                super.setupSetter(targetClass);\n            }\n        }"

//991
dict_stored[3]="private static void produceEmptyPdfFile(File targetFile)\n    {\n        // If improvement PDFBOX-914 is incorporated, we can do this with a straight call to\n        // org.apache.pdfbox.TextToPdf.createPDFFromText(new StringReader(\"\"));\n        // https://issues.apache.org/jira/browse/PDFBOX-914\n\n        PDPage pdfPage = new PDPage();\n        STARTREF try (PDDocument pdfDoc = new PDDocument();\n             PDPageContentStream ignore = new PDPageContentStream(pdfDoc, pdfPage))\n        { ENDREF\n            // Even though, we want an empty PDF, some libs (e.g. PDFRenderer) object to PDFs\n            // that have literally nothing in them. So we'll put a content stream in it.\n            STARTREF pdfDoc.addPage(pdfPage); ENDREF\n\n            STARTCOMMENT // Now write the in-memory PDF document into the temporary file. ENDCOMMENT\n            STARTREF pdfDoc.save(targetFile.getAbsolutePath());\n        } ENDREF\n        catch (IOException iox)\n        {\n            throw new TransformException(INTERNAL_SERVER_ERROR.value(),\n                \"Error creating empty PDF file\", iox);\n        }\n    }"
//1099
dict_stored[4]="private synchronized void checkActivity() {\n            long timeout = connectionManager.maxIdleInterval;\n            if (timeout == 0) {\n                Log.v(TAG, \"checkActivity: infinite timeout\");\n                return;\n            }\n            if(activityTimerTask != null) {\n                /* timer already running */\n                return;\n            }\n            timeout += connectionManager.ably.options.realtimeRequestTimeout;\n            long now = System.currentTimeMillis();\n            long next = lastActivityTime + timeout;\n            STARTREF if (now < next) { ENDREF\n                /* We have not reached maxIdleInterval+realtimeRequestTimeout\n                 * of inactivity.  Schedule a new timer for that long after the\n                 * last activity time. */\n                Log.v(TAG, \"checkActivity: ok\");\n                schedule((activityTimerTask = new TimerTask() {\n                    public void run() {\n                        try {\n                            checkActivity();\n                        } catch(Throwable t) {\n                            Log.e(TAG, \"Unexpected exception in activity timer handler\", t);\n                        }\n                    }\n                }), next - now);\n            STARTREF } else { ENDREF\n                STARTCOMMENT /* Timeout has been reached. Close the connection. */ ENDCOMMENT\n                STARTREF Log.e(TAG, \"No activity for \" + timeout + \"ms, closing connection\");\n                closeConnection(CloseFrame.ABNORMAL_CLOSE, \"timed out\");\n            } ENDREF\n        }"

//1684
dict_stored[5]="    private void onPressShift() {\n        mLongPressShiftLockFired = false;\n        // If we are recapitalizing, we don't do any of the normal processing, including\n        // importantly the double tap timer.\n        if (RecapitalizeStatus.NOT_A_RECAPITALIZE_MODE != mRecapitalizeMode) return;\n        if (mIsAlphabetMode) {\n            mIsInDoubleTapShiftKey = mSwitchActions.isInDoubleTapTimeout();\n            if (!mIsInDoubleTapShiftKey) {\n                // This is first tap.\n                mSwitchActions.startDoubleTapTimer();\n            }\n            if (mIsInDoubleTapShiftKey) {\n                if (mAlphabetShiftState.isManualShifted() || mIsInAlphabetUnshiftedFromShifted) {\n                    // Shift key has been double tapped while in manual shifted or automatic\n                    // shifted state.\n                    setShiftLocked(true);\n                } else {\n                    // Shift key has been double tapped while in normal state. This is the second\n                    // tap to disable shift locked state, so just ignore this.\n                }\n            } else {\n                STARTREF if (mAlphabetShiftState.isShiftLocked()) { ENDREF\n                    // Shift key is pressed while shift locked state, we will treat this state as\n                    // shift lock shifted state and mark as if shift key pressed while normal state.\n                    setShifted(SHIFT_LOCK_SHIFTED);\n                    mShiftKeyState.onPress();\n                STARTREF } else if (mAlphabetShiftState.isAutomaticShifted()) { ENDREF\n                    // Shift key is pressed while automatic shifted, we have to move to manual\n                    // shifted.\n                    setShifted(MANUAL_SHIFT);\n                    mShiftKeyState.onPress();\n                STARTREF } else if (mAlphabetShiftState.isShiftedOrShiftLocked()) { ENDREF\n                    // In manual shifted state, we just record shift key has been pressing while\n                    // shifted state.\n                    mShiftKeyState.onPressOnShifted();\n                STARTREF } else { ENDREF\n                    STARTCOMMENT // In base layout, chording or manual shifted mode is started. ENDCOMMENT\n                    STARTREF setShifted(MANUAL_SHIFT);\n                    mShiftKeyState.onPress(); ENDREF\n                }\n                mSwitchActions.startLongPressTimer(Constants.CODE_SHIFT);\n            }\n        } else {\n            // In symbol mode, just toggle symbol and symbol more keyboard.\n            toggleShiftInSymbols();\n            mSwitchState = SWITCH_STATE_MOMENTARY_SYMBOL_AND_MORE;\n            mShiftKeyState.onPress();\n        }\n    }\n"
//4099
dict_stored[6]="    private void ensureList() {\n        if (mList != null) {\n            return;\n        }\n        View root = getView();\n        if (root == null) {\n            throw new IllegalStateException(\"Content view not yet created\");\n        }\n        if (root instanceof ListView) {\n            mList = (ListView)root;\n        } else {\n            mStandardEmptyView = (TextView)root.findViewById(\n                    com.android.internal.R.id.internalEmpty);\n            if (mStandardEmptyView == null) {\n                mEmptyView = root.findViewById(android.R.id.empty);\n            } else {\n                mStandardEmptyView.setVisibility(View.GONE);\n            }\n            mProgressContainer = root.findViewById(com.android.internal.R.id.progressContainer);\n            mListContainer = root.findViewById(com.android.internal.R.id.listContainer);\n            View rawListView = root.findViewById(android.R.id.list);\n            if (!(rawListView instanceof ListView)) {\n                throw new RuntimeException(\n                        \"Content has view with id attribute 'android.R.id.list' \"\n                        + \"that is not a ListView class\");\n            }\n            mList = (ListView)rawListView;\n            if (mList == null) {\n                throw new RuntimeException(\n                        \"Your content must have a ListView whose id attribute is \" +\n                        \"'android.R.id.list'\");\n            }\n            if (mEmptyView != null) {\n                mList.setEmptyView(mEmptyView);\n            } else if (mEmptyText != null) {\n                mStandardEmptyView.setText(mEmptyText);\n                mList.setEmptyView(mStandardEmptyView);\n            }\n        }\n        mListShown = true;\n        mList.setOnItemClickListener(mOnClickListener);\n        STARTREF if (mAdapter != null) { ENDREF\n            ListAdapter adapter = mAdapter;\n            mAdapter = null;\n            setListAdapter(adapter);\n        STARTREF } else { ENDREF\n            STARTCOMMENT // We are starting without an adapter, so assume we won't\n            // have our data right away and start with the progress indicator. ENDCOMMENT\n            STARTREF if (mProgressContainer != null) {\n                setListShown(false, false);\n            }\n        } ENDREF\n        mHandler.post(mRequestFocus);\n    }"
//4930
dict_stored[7]="@CallSuper\n    @Override\n    void animateValue(float fraction) {\n        final Object target = getTarget();\n        STARTREF if (mTarget != null && target == null) { ENDREF\n            STARTCOMMENT // We lost the target reference, cancel and clean up. Note: we allow null target if the\n            /// target has never been set. ENDCOMMENT\n            STARTREF cancel();\n            return;\n        } ENDREF\n\n        super.animateValue(fraction);\n        int numValues = mValues.length;\n        for (int i = 0; i < numValues; ++i) {\n            mValues[i].setAnimatedValue(target);\n        }\n    }"
// 423
dict_stored[8]="    public static List<String> complete(CommandSender sender, String arg) {\n        if (arg.isEmpty()) {\n            return null;\n        }\n\n        STARTCOMMENT // Load registered parameters ENDCOMMENT\n        STARTREF final HashMap<String, PrismParameterHandler> registeredParams = Prism.getParameters(); ENDREF\n\n        // Match command argument to parameter handler\n        for (final Entry<String, PrismParameterHandler> entry : registeredParams.entrySet()) {\n            if (entry.getValue().applicable(arg, sender) && entry.getValue().hasPermission(arg, sender)) {\n                return entry.getValue().tabComplete(arg, sender);\n            }\n        }\n\n        return null;\n    }"
// 596
dict_stored[9]="    public void addChange(String valuePath, String attributeName, int valueIndex, ChangeType changeType) {\n\n        if (ChangeType.value.equals(changeType)) {\n            if (m_changeTimer != null) {\n                STARTREF if (!m_changeTimer.matches(valuePath, attributeName, valueIndex)) { ENDREF\n                    STARTCOMMENT // only in case the change properties of the timer do not match the current change,\n                    // add the last change and start a new timer ENDCOMMENT\n                    STARTREF m_changeTimer.cancel();\n                    m_changeTimer.run();\n                    m_changeTimer = new ChangeTimer(valuePath, attributeName, valueIndex, changeType);\n                    m_changeTimer.schedule(CHANGE_TIMER_DELAY);\n                } ENDREF\n            } else {\n                m_changeTimer = new ChangeTimer(valuePath, attributeName, valueIndex, changeType);\n                m_changeTimer.schedule(CHANGE_TIMER_DELAY);\n            }\n        } else {\n            if (m_changeTimer != null) {\n                m_changeTimer.cancel();\n                m_changeTimer.run();\n            }\n            internalAddChange(valuePath, attributeName, valueIndex, changeType);\n        }\n    }"
// 9749
dict_stored[10]="  protected void terminateMultiInstanceRoot(DelegateExecution execution, CommandContext commandContext,\n      ExecutionEntityManager executionEntityManager) {\n\n    STARTCOMMENT // When terminateMultiInstance is 'true', we look for the multi instance root and delete it from there. ENDCOMMENT\n    STARTREF ExecutionEntity miRootExecutionEntity = executionEntityManager.findFirstMultiInstanceRoot((ExecutionEntity) execution);\n    if (miRootExecutionEntity != null) { ENDREF\n\n      // Create sibling execution to continue process instance execution before deletion\n      ExecutionEntity siblingExecution = executionEntityManager.createChildExecution(miRootExecutionEntity.getParent());\n      siblingExecution.setCurrentFlowElement(miRootExecutionEntity.getCurrentFlowElement());\n\n      STARTREF deleteExecutionEntities(executionEntityManager, miRootExecutionEntity, createDeleteReason(miRootExecutionEntity.getActivityId())); ENDREF\n\n      Context.getAgenda().planTakeOutgoingSequenceFlowsOperation(siblingExecution, true);\n    } else {\n      defaultTerminateEndEventBehaviour(execution, commandContext, executionEntityManager);\n    }\n  }"


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
