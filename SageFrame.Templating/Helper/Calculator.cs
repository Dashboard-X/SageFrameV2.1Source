﻿#region "Copyright"
/*
SageFrame® - http://www.sageframe.com
Copyright (c) 2009-2012 by SageFrame
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
#endregion

#region "References"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SageFrame.Templating.xmlparser;
#endregion

namespace SageFrame.Templating
{
    public class Calculator
    {
        /// <summary>
        /// Calculates the column width for the middle block
        /// Takes the ColumnWidth from the Parent Node which applies to right and left
        /// However the inline "width" attributes overrides the Parent's colwidth attribute
        /// </summary>
        /// <param name="section"></param>
        /// <param name="_type"></param>
        /// <returns></returns>
        public static string CalculateColumnWidth(XmlTag section, Placeholders _type)
        {
            string width = "20";
            foreach (XmlTag tag in section.LSTChildNodes)
            {
                if (Utils.CompareStrings(_type, Utils.GetAttributeValueByName(tag, XmlAttributeTypes.NAME)))
                {
                    int widthIndex = -1;
                    widthIndex = tag.LSTAttributes.FindIndex(
                        delegate(LayoutAttribute tagAttr)
                        {
                            return (Utils.CompareStrings(tagAttr.Name, XmlAttributeTypes.WIDTH));
                        }
                        );
                    if (widthIndex > -1)
                    {
                        width = tag.LSTAttributes[widthIndex].Value;
                    }
                    else
                    {
                        foreach (LayoutAttribute attr in section.LSTAttributes)
                        {
                            if (Utils.CompareStrings(attr.Name, XmlAttributeTypes.WIDTH))
                            {
                                width = attr.Value;
                            }
                            else if (Utils.CompareStrings(attr.Name, XmlAttributeTypes.COLWIDTH))
                            {
                                width = attr.Value;
                            }
                        }
                    }
                }
            }
            return width;
        }

        public static int GetRemainingWidth(string[] arrWidth)
        {
            int sum = 0;
            for (int i = 0; i < arrWidth.Length; i++)
            {
                sum += int.Parse(arrWidth[i]);
            }
            int remaining = 100 - sum;
            remaining = remaining == 0 ? 100 : remaining;
            return (remaining);
        }

        public static int CalculateWrapperWidth(string[] positionArr, string[] arrWidth, string[] wrapPositions, string mode, out List<KeyValue> lstPositionWidth)
        {
            float wrapperwidth = 0;
            List<KeyValue> lstWidths = new List<KeyValue>();
            switch (mode)
            {
                case "fixed":
                    int blockwidth = 100 / positionArr.Length;
                    wrapperwidth = blockwidth * wrapPositions.Length;
                    lstWidths.Add(new KeyValue("", ""));
                    break;
                case "normal":
                    for (int i = 0; i < positionArr.Length; i++)
                    {

                        if (arrWidth.Length > i)
                        {                           
                                if (Decide.Contains(positionArr,wrapPositions))
                                {
                                    lstWidths.Add(new KeyValue(positionArr[i], arrWidth[i]));                                    
                                }                            
                        }
                        else if (i == arrWidth.Length)
                        {
                            wrapperwidth += float.Parse(GetRemainingWidth(arrWidth).ToString());
                            lstWidths.Add(new KeyValue(positionArr[i], wrapperwidth.ToString()));
                        }
                        else
                        {
                            lstWidths.Add(new KeyValue(positionArr[i], "100"));
                        }
                    }
                    wrapperwidth = 0;
                    foreach (KeyValue kvp in lstWidths)
                    {
                        if (wrapPositions.Contains(kvp.Key))
                        {
                            wrapperwidth += float.Parse(kvp.Value);
                        }
                    }
                    break;
            }
            if (wrapperwidth > 100) { wrapperwidth = 100; }
            lstPositionWidth = lstWidths;
            return int.Parse(wrapperwidth.ToString());

        }
      
        public static int CalculatePostWrapWidth(string[] positionArr, string currentPosition, int totalwidth, string mode, List<KeyValue> lstWidths)
        {
            float wrapperwidth = 0;
            switch (mode)
            {
                case "fixed":
                    int blockwidth = 100 / positionArr.Length;
                    wrapperwidth = ((float.Parse(blockwidth.ToString()) / float.Parse(totalwidth.ToString()))) * 100;
                    break;
                case "normal":
                    foreach (KeyValue kvp in lstWidths)
                    {
                        if (currentPosition.Equals(kvp.Key))
                        {
                            wrapperwidth = ((float.Parse(kvp.Value) / float.Parse(totalwidth.ToString()))) * 100;
                        }
                    }
                    break;
            }
            int result = 0;
            if (wrapperwidth.ToString().IndexOf('.') > -1)
                int.TryParse(wrapperwidth.ToString().Substring(0, wrapperwidth.ToString().IndexOf('.')), out result);
            else
                int.TryParse(wrapperwidth.ToString(), out result);

            return result;
        }

        public static void DecreaseWidthForAdjustment(ref List<KeyValue> lstWidth)
        {
            foreach (KeyValue kvp in lstWidth)
            {
                if (kvp.Value != "NaN" && kvp.Value != "0")
                {
                    kvp.Value = (double.Parse(kvp.Value.ToString())).ToString();
                    kvp.Value = kvp.Value + "%";
                }
            }
        }

        public static List<KeyValue> CalculateMiddleBlockWidth(XmlTag middleBlock)
        {
            double left = 0.0, leftA = 0.0, leftB = 0.0;
            if (Decide.HasBlock(Placeholders.LEFTTOP, middleBlock) || Decide.HasBlock(Placeholders.LEFTBOTTOM, middleBlock) || (Decide.HasBlock(Placeholders.LEFTA, middleBlock) && Decide.HasBlock(Placeholders.LEFTB, middleBlock)))
            {
                if (Decide.HasBlock(Placeholders.LEFTA, middleBlock) && Decide.HasBlock(Placeholders.LEFTB, middleBlock))
                {
                    left = 2;
                    leftA = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.LEFTA));
                    leftB = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.LEFTB));
                }
                else if (Decide.HasBlock(Placeholders.LEFTA, middleBlock) && !Decide.HasBlock(Placeholders.LEFTB, middleBlock))
                {
                    left = 1;
                    leftA = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.LEFTA));

                }
                else if (!Decide.HasBlock(Placeholders.LEFTA, middleBlock) && Decide.HasBlock(Placeholders.LEFTB, middleBlock))
                {
                    left = 1;
                    leftB = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.LEFTB));
                }
            }
            else if (Decide.HasBlock(Placeholders.LEFTA, middleBlock))
            {
                left = 1;
                leftA = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.LEFTA));
            }
            else if (Decide.HasBlock(Placeholders.LEFTB, middleBlock))
            {
                left = 1;
                leftB = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.LEFTB));
            }

            double totalleft = left > 0 ? (leftA + leftB) / left : 0;

            double right = 0.0, rightA = 0.0, rightB = 0.0;
            if (Decide.HasBlock(Placeholders.RIGHTTOP, middleBlock) || Decide.HasBlock(Placeholders.RIGHTBOTTOM, middleBlock) || (Decide.HasBlock(Placeholders.RIGHTA, middleBlock) && Decide.HasBlock(Placeholders.RIGHTB, middleBlock)))
            {
                if (Decide.HasBlock(Placeholders.RIGHTA, middleBlock) && Decide.HasBlock(Placeholders.RIGHTB, middleBlock))
                {
                    right = 2;
                    rightA = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.RIGHTA));
                    rightB = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.RIGHTB));
                }
                else if (Decide.HasBlock(Placeholders.RIGHTA, middleBlock) && !Decide.HasBlock(Placeholders.RIGHTB, middleBlock))
                {
                    right = 1;
                    rightA = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.RIGHTA));

                }
                else if (!Decide.HasBlock(Placeholders.RIGHTA, middleBlock) && Decide.HasBlock(Placeholders.RIGHTB, middleBlock))
                {
                    right = 1;

                    rightB = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.RIGHTB));
                }
            }
            else if (Decide.HasBlock(Placeholders.RIGHTA, middleBlock))
            {
                right = 1;
                rightA = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.RIGHTA));
            }
            else if (Decide.HasBlock(Placeholders.RIGHTB, middleBlock))
            {
                right = 1;
                rightB = double.Parse(Calculator.CalculateColumnWidth(middleBlock, Placeholders.RIGHTB));
            }

            double totalright = right > 0 ? (rightA + rightB) / right : 0;
            double totalWidth = 100;
            rightA = (rightA * 100) / (totalright * right);
            rightA = rightA.ToString() == "NaN" ? 0 : rightA;
            rightB = totalWidth - rightA;
            rightB = rightB.ToString() == "NaN" ? 0 : rightB;

            double middle = totalWidth - totalright;
            middle = totalWidth - totalleft - totalright;

            leftA = (leftA * 100) / (totalleft * left);
            leftA = leftA.ToString() == "NaN" ? 0 : leftA;
            leftB = totalWidth - leftA;
            leftB = leftB.ToString() == "NaN" ? 0 : leftB;
            middle = totalWidth - totalleft - totalright;
                       
            List<KeyValue> widthsKvp = new List<KeyValue>();
            widthsKvp.Add(new KeyValue("Left", totalleft.ToString()));
            widthsKvp.Add(new KeyValue("LeftA", leftA.ToString()));
            widthsKvp.Add(new KeyValue("LeftB", leftB.ToString()));
            widthsKvp.Add(new KeyValue("Right", totalright.ToString()));
            widthsKvp.Add(new KeyValue("RightA", rightA.ToString()));
            widthsKvp.Add(new KeyValue("RightB", rightB.ToString()));
            widthsKvp.Add(new KeyValue("Center", middle.ToString()));

            DecreaseWidthForAdjustment(ref widthsKvp);

            return widthsKvp;

        }
       
    }
}
