/// <reference path="Contact.js" />



var app = angular.module('myApp', ['ngWYSIWYG']);
app.controller('LoadingCtrl', function ($scope, $http,$log) {
    var reader;
    var progress = document.querySelector('.percent');
    var path;
    function abortRead() {
        reader.abort();
    }

    function errorHandler(evt) {
        switch (evt.target.error.code) {
            case evt.target.error.NOT_FOUND_ERR:
                alert('File Not Found!');
                break;
            case evt.target.error.NOT_READABLE_ERR:
                alert('File is not readable');
                break;
            case evt.target.error.ABORT_ERR:
                break; // noop
            default:
                alert('An error occurred reading this file.');
        };
    }

    function updateProgress(evt) {
        // evt is an ProgressEvent.
        if (evt.lengthComputable) {
            var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
            // Increase the progress bar length.
            if (percentLoaded < 100) {
                progress.style.width = percentLoaded + '%';
                progress.textContent = percentLoaded + '%';
            }
        }
    }

    var str = "";
    function handleFileSelect(evt) {
        // Reset progress indicator on new file selection.
        progress.style.width = '0%';
        progress.textContent = '0%';

        reader = new FileReader();
        reader.onerror = errorHandler;
        reader.onprogress = updateProgress;
        reader.onabort = function (e) {
            alert('File read cancelled');
        };
        reader.onloadstart = function (e) {
            document.getElementById('progress_bar').className = 'loading';
        };
        reader.onload = function (e) {
            // Ensure that the progress bar displays 100% at the end.
            progress.style.width = '100%';
            progress.textContent = '100%';
            setTimeout("document.getElementById('progress_bar').className='';", 2000);

            //var xml = document.createElement('div');
            //xml.innerHTML = ['<p>', e.target.result, '</p>'].join('');
            //document.getElementById('list').insertBefore(xml, null);

            var parsed = new DOMParser().parseFromString(e.target.result, "text/xml");
            var JobTitle = evt.target.files[0].name;


            var serializer = new XMLSerializer();
            str = serializer.serializeToString(parsed);

            //var span = document.createElement('span');
            //span.innerHTML = ['<img class="thumb" src="', e.target.result,
            //                  '" title="', escape(evt.target.files[0].name), '"/>'].join('');
            //document.getElementById('list').insertBefore(span, null);

            $http({
                method: "POST",
                //url: "@Url.Action("Setjson")",
                url: "/Home/GetXML",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ xmlStr: str })
            }).then(function mySucces(response) {
                $scope.Errors = response.data;
                console.log($scope.Errors);
            }, function myError(response) {
                //alert("error");
            });

            $http({
                method: "POST",
                url: "/Home/SetJob",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ JobTitle: JobTitle })
            }).then(function mySucces(response) {
                $scope.Errors = response.data;
                console.log($scope.Errors);
            }, function myError(response) {
                //alert("error");
            });



        }

        var rowno = 1;

        function drawTable(data) {
            //$("#ErrorDiv").addClass("show");
            //$("ErrorDiv").removeClass("hide");
            for (var i = 0; i < data.length; i++) {
                drawRow(data[i]);
            }
        }

        function drawRow(rowData) {
            var row = $("<tr />")
            $("#personDataTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
            row.append($("<td>" + rowno + "</td>"));
            row.append($("<td>" + rowData.Message + "</td>"));
            row.append($("<td>" + rowData.Element + "</td>"));
            row.append($("<td>" + rowData.Value + "</td>"));
            row.append($("<td>" + rowData.Path + "</td>"));
            row.append($("<td>" + rowData.Descreption + "</td>"));
            rowno++;
        }



        // Read in the image file as a binary string.
        //reader.readAsBinaryString(evt.target.files[0]);
        reader.readAsText(evt.target.files[0]);
        path = evt.target.files[0];
    }

    document.getElementById('files').addEventListener('change', handleFileSelect, false);



});