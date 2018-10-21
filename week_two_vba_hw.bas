Attribute VB_Name = "Module1"
Sub processing()


Dim row_number As Long
Dim ticker_tag As String
Dim ticker_last As String
Dim ticker_next As String
Dim ticker_count As Integer
Dim daily_volume As Double
Dim year_start As Double
Dim year_end As Double
Dim total_volume As Double
Dim greatest_total_volume As Double
Dim percent_change As Double
Dim greatest_percent_change As Double


Dim col_length As Long


col_length = Cells(Rows.Count, 1).End(xlUp).Row
ticker_counter = 1

For row_number = 2 To col_length

ticker_last = Cells(row_number - 1, 1).Value
ticker_tag = Cells(row_number, 1).Value
ticker_next = Cells(row_number + 1, 1).Value
If Not ticker_tag = ticker_last Then
close_price = Cells(row_number, 4).Value
daily_volume = Cells(row_number, 7).Value
year_start = Cells(row_number, 6).Value

ElseIf ticker_tag = ticker_last And ticker_tag = ticker_next Then
daily_volume = (daily_volume + Cells(row_number, 7).Value)

ElseIf Not ticker_tag = ticker_next Then
year_end = Cells(row_number, 6).Value
daily_volume = daily_volume + Cells(row_number, 4).Value
ticker_counter = ticker_counter + 1
Cells(ticker_counter, 9).Value = ticker_tag

If year_start = 0 Then

Cells(ticker_counter, 11).Value = "N/A"

ElseIf Not year_start = 0 Then

Cells(ticker_counter, 10).Value = year_end - year_start
Cells(ticker_counter, 11).Value = year_end / year_start
Cells(ticker_counter, 12).Value = daily_volume

End If

End If

Next row_number



End Sub

