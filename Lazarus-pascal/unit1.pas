unit Unit1;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, ExtCtrls, Menus,
  StdCtrls, Windows;

type

  { TForm1 }

  TForm1 = class(TForm)
    Button1: TButton;
    Button2: TButton;
    Edit1: TEdit;
    Edit2: TEdit;
    Edit3: TEdit;
    Edit4: TEdit;
    Edit5: TEdit;
    Edit6: TEdit;
    Image1: TImage;
    Image2: TImage;
    Image3: TImage;
    Image4: TImage;
    Image5: TImage;
    Label1: TLabel;
    Label2: TLabel;
    MainMenu1: TMainMenu;
    MainMenu2: TMainMenu;
    MenuItem1: TMenuItem;
    MenuItem10: TMenuItem;
    MenuItem11: TMenuItem;
    MenuItem12: TMenuItem;
    MenuItem2: TMenuItem;
    MenuItem3: TMenuItem;
    MenuItem4: TMenuItem;
    MenuItem5: TMenuItem;
    MenuItem6: TMenuItem;
    MenuItem7: TMenuItem;
    MenuItem8: TMenuItem;
    MenuItem9: TMenuItem;
    N1: TMenuItem;
    OpenDialog1: TOpenDialog;
    SaveDialog1: TSaveDialog;
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Edit1Change(Sender: TObject);
    procedure Edit2Change(Sender: TObject);
    procedure Edit3Change(Sender: TObject);
    procedure Edit4Change(Sender: TObject);
    procedure Edit6Change(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Image1Click(Sender: TObject);
    procedure Image1MouseMove(Sender: TObject; Shift: TShiftState; X, Y: Integer
      );
    procedure Label1Click(Sender: TObject);
    procedure LabeledEdit1Change(Sender: TObject);
    procedure MenuItem10Click(Sender: TObject);
    procedure MenuItem11Click(Sender: TObject);
    procedure MenuItem12Click(Sender: TObject);
    procedure MenuItem2Click(Sender: TObject);
    procedure MenuItem3Click(Sender: TObject);
    procedure MenuItem4Click(Sender: TObject);
    procedure MenuItem5Click(Sender: TObject);
    procedure MenuItem6Click(Sender: TObject);
    procedure MenuItem7Click(Sender: TObject);
    procedure MenuItem8Click(Sender: TObject);
    procedure MenuItem9Click(Sender: TObject);
  private

  public

  end;

var
  Form1: TForm1;
  imE, imS : array [0..319,0..239] of byte;
  r, g, b : byte;
  cor : TColor;
  c, i, j, x, y, alt, larg : integer;
  Qtde : LongInt;


implementation

{$R *.lfm}

{ TForm1 }

procedure TForm1.MenuItem5Click(Sender: TObject);
begin
  Close();
end;

procedure TForm1.MenuItem6Click(Sender: TObject);
begin
// Implementar os filtros da média e da mediana
   for j := 0 to Image1.Width - 1 do
       begin
       for i := 0 to Image1.height - 1 do
           begin
           Ims[i,j] := Ime[i,j];
           Image2.Canvas.Pixels[i,j] := RGB(Ims[i,j],Ims[i,j],Ims[i,j]);
           end;
       end;
alt := Image1.height;
larg := Image1.Width;
Qtde := (alt + larg) div 10;
for i := 0 to Qtde do
    begin
    x := random(alt);
    y := random(larg);
    // ou 0 ou 255
    cor := 255;
    Ims[x,y] := cor;
    Image2.Canvas.Pixels[i,j] := RGB(Ims[x,y], Ims[x,y], Ims[x,y]);
    end;
end;

procedure TForm1.MenuItem7Click(Sender: TObject);
begin
  for i:= 0 to Image1.Width - 1 do
   for j:= 0 to Image1.height - 1 do
    begin
      cor := Image1.Canvas.Pixels[i,j];
      r := GetRValue(cor);
      g := GetGValue(cor);
      b := GetBValue(cor);
      c := (r + g + b) div 3;
      Ims[i,j] := c;
      Image2.Canvas.Pixels[i,j] := RGB(c,c,c);
    end;
end;

procedure TForm1.MenuItem8Click(Sender: TObject);
begin

  for i:= 0 to Image1.Width - 1 do
   for j:= 0 to Image1.height - 1 do
    begin
      Ims[i,j] := 255 - Ime[i,j];
      Image2.Canvas.Pixels[i,j] := RGB(Ims[i,j],Ims[i,j],Ims[i,j]);
    end;
end;

procedure TForm1.MenuItem9Click(Sender: TObject);
begin
  for i:= 0 to Image1.Width - 1 do
   for j:= 0 to Image1.height - 1 do
    begin
      cor := Image1.Canvas.Pixels[i,j];
      r := GetRValue(cor);
      g := GetGValue(cor);
      b := GetBValue(cor);
      Image2.Canvas.Pixels[i,j] := RGB(255-r,255-g,255-b);
    end;
end;

procedure TForm1.MenuItem3Click(Sender: TObject);
begin
  if (OpenDialog1.Execute)
   then
    Image1.Picture.LoadFromFile(OpenDialog1.FileName);
end;

procedure TForm1.Button1Click(Sender: TObject);
begin
  Image1.Picture := Image2.Picture;

  for i:= 0 to Image1.Width - 1 do
   for j:= 0 to Image1.height - 1 do
    Ime[i,j] := Ims[i,j];
end;

procedure TForm1.Button2Click(Sender: TObject);
begin
  // RGB to HSV
  procedure RGBtoHSV(R, G, B: real; Out H, S, V: real);
{ Prevod RGB to HSV }

var
  k, r1, g1, b1: real;

begin { RGBtoHSV }
  V := max(R, G, B);
  k := min(R, G, B);
  if V <> 0 then
    S := (V - k) / V
  else
    S := 0;
  if S <> 0 then
  begin { if 1 }
    r1 := (V - R) / (V - k);
    g1 := (V - G) / (V - k);
    b1 := (V - B) / (V - k);
    if V = R then
      if k = G then
        H := 5 + b1
      else
        H := 1 - g1
    else
    if V = G then
      if k = B then
        H := 1 + r1
      else
        H := 3 - b1
    else if k = R then
      H := 3 + g1
    else
      H := 5 - r1;
    H := H * 60;
  end   { if 1 }
  else
    h := 0;
end;  { RGBtoHSV }
end;

procedure TForm1.Edit1Change(Sender: TObject);
begin

end;

procedure TForm1.Edit2Change(Sender: TObject);
begin

end;

procedure TForm1.Edit3Change(Sender: TObject);
begin

end;

procedure TForm1.Edit4Change(Sender: TObject);
begin

end;

procedure TForm1.Edit6Change(Sender: TObject);
begin

end;

procedure TForm1.FormCreate(Sender: TObject);
begin

end;

procedure TForm1.Image1Click(Sender: TObject);
begin

end;

procedure TForm1.Image1MouseMove(Sender: TObject; Shift: TShiftState; X,
  Y: Integer);
begin
  Edit1.Text := IntToStr(X);
  Edit2.Text := IntToStr(Y);
  cor := Image1.Canvas.Pixels[X,Y];

  for i:= 0 to Image5.Width - 1 do
   for j:= 0 to Image5.height - 1 do
    Image5.Canvas.Pixels[i,j] := cor;

end;

procedure TForm1.Label1Click(Sender: TObject);
begin

end;

procedure TForm1.LabeledEdit1Change(Sender: TObject);
begin

end;

procedure TForm1.MenuItem10Click(Sender: TObject);
begin
  for i:= 0 to Image1.Width - 1 do
   for j:= 0 to Image1.height - 1 do
    begin
      cor := Image1.Canvas.Pixels[i,j];
      r := GetRValue(cor);
      g := GetGValue(cor);
      b := GetBValue(cor);

      Image2.Canvas.Pixels[i,j] := RGB(r,0,0);   // vermelho
      Image3.Canvas.Pixels[i,j] := RGB(0,g,0);   // verde
      Image4.Canvas.Pixels[i,j] := RGB(0,0,b);   // azul
    end;
end;

procedure TForm1.MenuItem11Click(Sender: TObject);
begin

end;

procedure TForm1.MenuItem12Click(Sender: TObject);
begin
  // Espelha imagem
  for i:= 0 to 320 - 1 do
   for j:= 0 to 240 - 1 do
    begin
    Image2.Canvas.Pixels[i,j] := Image1.Canvas.Pixels[320-i,j];
    end;
end;

procedure TForm1.MenuItem2Click(Sender: TObject);
begin

end;

procedure TForm1.MenuItem4Click(Sender: TObject);
begin
  if (SaveDialog1.Execute)
   then
    Image2.Picture.SaveToFile(SaveDialog1.FileName);
end;

end.

