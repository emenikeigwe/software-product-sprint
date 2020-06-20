// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public final class DataServlet extends HttpServlet {
  private HashMap<String, String> comments = new HashMap<String, String>();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String commenter = getParameter(request, "comment-name", "");
    String comment = getParameter(request, "comment", "");

    LocalDateTime commentTime = LocalDateTime.now();
    DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

    String formattedCommentTime = commentTime.format(formatter);
    String combined = commenter+" "+formattedCommentTime;

    comments.put(combined, comment);
    //comment content: remove later
    response.setContentType("text/html;");
    response.getWriter().println(comments);
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json;");
    response.getWriter().println(convertToJsonUsingGson(comments));
  }
  private String convertToJsonUsingGson(HashMap<String, String> comments) {
    Gson gson = new Gson();
    String json = gson.toJson(comments);
    return json;
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}
